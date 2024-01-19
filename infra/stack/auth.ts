import * as aws from "@pulumi/aws";

export function createUserPool(_bucketArn: string) {

  const userPool = new aws.cognito.UserPool("userPool", {
    autoVerifiedAttributes: ["email"],
    name: 'dev' // TODO: make this dynamic using active(current) env
  });

  // Create a User Pool Group for Admins
  const adminsGroup = new aws.cognito.UserGroup("Admins", {
    userPoolId: userPool.id,
    description: "Administrative users",
    name: 'Admins'
  });

  // Create a User Pool Group for Regular Users
  const usersGroup = new aws.cognito.UserGroup("Users", {
    userPoolId: userPool.id,
    description: "End users",
    name: 'Users'
  });

  return {
    userPoolId: userPool.id,
    usersGroupId: usersGroup.id,
    adminsGroupId: adminsGroup.id,
  };
}
