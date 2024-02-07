import * as aws from '@pulumi/aws';

/**
 * Base policy shared by Lambda Fns
 */
export const basePolicy = new aws.iam.Policy('base-policy', {
  path: '/',
  description: 'Base IAM Policy For Lambda Functions',
  policy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Action: ['ses:*', 'lambda:InvokeFunction', 'lambda:InvokeAsync'],
        Effect: 'Allow',
        Resource: '*',
      },
    ],
  }),
});

/**
 * Base role shared by common resources
 */
export const baseRole = new aws.iam.Role('base-role', {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: 'lambda.amazonaws.com',
  }),
  managedPolicyArns: [basePolicy.arn],
});
