import * as aws from '@pulumi/aws';
import { STACK_NAME } from '../utils';

export function createUserPool() {
  const userPool = new aws.cognito.UserPool('userPool', {
    autoVerifiedAttributes: ['email'],
    name: `${STACK_NAME}`,
    // TODO: investigate deletionProtection: 'ACTIVE'
  });

  const userPoolClient = new aws.cognito.UserPoolClient("userPoolClient", {
    userPoolId: userPool.id,
    name: `${STACK_NAME}-app-client`,
    explicitAuthFlows: ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"],
    generateSecret: true,
});

  // Create a User Pool Group for Admins
  const adminsGroup = new aws.cognito.UserGroup('Admins', {
    userPoolId: userPool.id,
    description: 'Administrative users',
    name: 'Admins',
  });

  // Create a User Pool Group for Regular Users
  const usersGroup = new aws.cognito.UserGroup('Users', {
    userPoolId: userPool.id,
    description: 'End users',
    name: 'Users',
  });

  return {
    userPoolId: userPool.id,
    usersGroupId: usersGroup.id,
    adminsGroupId: adminsGroup.id,
    userPoolClientId: userPoolClient.id
  };
}
