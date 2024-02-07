import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import {customMessageLambda} from './cognito/lambdas/customMessage';

const STACK_NAME = pulumi.getStack();

export function createUserPool() {
  const userPool = new aws.cognito.UserPool(`${STACK_NAME}-userPool`, {
    autoVerifiedAttributes: ['email'],
    lambdaConfig: pulumi
      .all([customMessageLambda.arn])
      .apply(([customMessageArn]) => ({
        customMessage: customMessageArn,
      })),
    // TODO: investigate deletionProtection: 'ACTIVE'
  });

  const userPoolClient = new aws.cognito.UserPoolClient(
    `${STACK_NAME}-app-client`,
    {
      userPoolId: userPool.id,
      explicitAuthFlows: [
        'ALLOW_USER_PASSWORD_AUTH',
        'ALLOW_REFRESH_TOKEN_AUTH',
      ],
      generateSecret: true,
    },
    {dependsOn: userPool}
  );

  const adminsGroup = new aws.cognito.UserGroup(
    `${STACK_NAME}-Admins`,
    {
      userPoolId: userPool.id,
      description: 'Administrative users',
      name: 'ADMINS',
    },
    {dependsOn: userPool}
  );

  const usersGroup = new aws.cognito.UserGroup(
    `${STACK_NAME}-Users`,
    {
      userPoolId: userPool.id,
      description: 'End users',
      name: 'USERS',
    },
    {dependsOn: userPool}
  );

  try {
    new aws.lambda.Permission('allow-cognito', {
      action: 'lambda:InvokeFunction',
      function: customMessageLambda.name,
      principal: 'cognito-idp.amazonaws.com',
      sourceArn: userPool.arn,
    });
  } catch (e) {
    console.error('Error creating lambda permission', e);
  }

  return {
    userPoolId: userPool.id,
    usersGroupId: usersGroup.id,
    userPoolArn: userPool.arn,
    adminsGroupId: adminsGroup.id,
    userPoolClientId: userPoolClient.id,
  };
}
