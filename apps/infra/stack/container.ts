import * as pulumi from '@pulumi/pulumi';
import * as awsx from '@pulumi/awsx';
import * as aws from '@pulumi/aws';
import * as database from './database';
import * as config from './config';
import { createApi } from './api';
import { createRepository } from './image';

const AWS_ACCESS_KEY_ID = config.getConfig().accesskeyId;
const AWS_SECRET_ACCESS_KEY = config.getConfig().accessSecretKey;
const AWS_REGION = config.getConfig().region;
const STACK_NAME = config.getConfig().stackName;

console.info('AWS_ACCESS_KEY_ID', AWS_ACCESS_KEY_ID);

export function createContainer(userPool: {
  userPoolId: string;
  userPoolClientId: string;
}) {
  const LOG_DRIVER = 'awslogs';
  const CONTAINER_CPU = 512;
  const CONTAINER_MEMORY = 1024;
  const INSTANCE_DESIRED_COUNT = 2;

  const AWS_COGNITO_USER_POOL_ID = userPool.userPoolId;
  const AWS_COGNITO_CLIENT_ID = userPool.userPoolClientId;
  const AWS_COGNITO_ISSUER = `https://cognito-idp.${AWS_REGION}.amazonaws.com/${AWS_COGNITO_USER_POOL_ID}`;
  /*
   Here we are using AWSx Crosswalk libraries that capture higher-level AWS best practices rather 
   than mapping raw infrastructure constructs.
   @see: https://www.pulumi.com/blog/crosswalk-for-aws-1-0/
 */
  const cluster = new awsx.classic.ecs.Cluster(`${STACK_NAME}-cluster`);

  console.info('Creating Database....');
  const rds = database.createDBInstance(cluster);

  console.info('Creating Image....');
  const image = createRepository(rds.dbConnectionString);

  console.info('Creating API....');
  const { alb, api, apiDomainName } = createApi(cluster);

  console.info('Creating Container Service....');
  /* Logs for backend service (in CloudWatch) */
  const logGroup = new aws.cloudwatch.LogGroup(
    `${STACK_NAME}-backend-LogGroup`
  );

  /* 
  Creates a Fargate service task that can scale out. 
  Slick! this resource will also create and attach aws.iam.Role 
  */
  new awsx.classic.ecs.FargateService(`${STACK_NAME}-svc`, {
    cluster,
    taskDefinitionArgs: {
      container: {
        environment: [
          {
            name: 'DATABASE_URL',
            value: pulumi.interpolate`${rds.dbConnectionString}`,
          },
          {
            name: 'AWS_COGNITO_USER_POOL_ID',
            value: AWS_COGNITO_USER_POOL_ID,
          },
          {
            name: 'AWS_COGNITO_CLIENT_ID',
            value: AWS_COGNITO_CLIENT_ID,
          },
          {
            name: 'AWS_REGION',
            value: AWS_REGION,
          },
          {
            name: 'AWS_ACCESS_KEY_ID',
            value: AWS_ACCESS_KEY_ID,
          },
          {
            name: 'AWS_SECRET_ACCESS_KEY',
            value: AWS_SECRET_ACCESS_KEY,
          },
          {
            name: 'AWS_COGNITO_ISSUER',
            value: AWS_COGNITO_ISSUER,
          },
          {
            name: 'NO_REPLY_EMAIL',
            value: 'noreply@mpi.co.za', //TODO: will be set by SES identity.
          },
        ],
        image: pulumi.interpolate`${image.imageUri}`,
        cpu: CONTAINER_CPU,
        memory: CONTAINER_MEMORY,
        portMappings: [api],
        logConfiguration: {
          logDriver: LOG_DRIVER,
          options: {
            'awslogs-group': logGroup.name,
            'awslogs-region': AWS_REGION,
            'awslogs-stream-prefix': `${STACK_NAME}-stream`,
          },
        },
      },
    },
    desiredCount: INSTANCE_DESIRED_COUNT,
    waitForSteadyState: true,
    tags: { Name: `${STACK_NAME}-fargate-service` },
  });

  return {
    serviceUrl: alb.loadBalancer.dnsName,
    databaseUrl: rds.dbConnectionString,
    imageUri: image.imageUri,
    repositoryUrl: image.repoUrl,
    imageTag: image.imageTag
  };
}
