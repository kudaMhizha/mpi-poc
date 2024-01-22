import * as awsx from '@pulumi/awsx';
import * as aws from '@pulumi/aws';
import { STACK_NAME } from './stack/utils';

export function createDockerImage() {
  /*
 * Here we are using AWSx Crosswalk libraries that capture higher-level AWS best practices rather 
   than mapping raw infrastructure constructs.
 * https://www.pulumi.com/blog/crosswalk-for-aws-1-0/
 */
  const cluster = new awsx.classic.ecs.Cluster(`${STACK_NAME}-cluster`);

  /* Define the Networking for our service. 
  This crosswalk resource will automatically create:
  1. aws.ec2.SecurityGroup
  2. aws.lb.TargerGroup
  3. aws.lb.listener
  4. and uses the default AWS VPC and subnets!!
*/
  const alb = new awsx.classic.lb.ApplicationLoadBalancer(`${STACK_NAME}-lb`, {
    external: true,
    securityGroups: cluster.securityGroups,
  });

  const api = alb.createListener(`${STACK_NAME}-api`, {
    port: 3333,
    external: true,
    protocol: 'HTTP',
  });

  const repo = new awsx.ecr.Repository('repo', {
    forceDelete: true,
  });

  // Build and publish a Docker image to a private ECR registry.
  const img = new awsx.ecr.Image('app-img', {
    repositoryUrl: repo.url,
    context: '../',
    platform: 'linux/amd64',
  });

  // Create a new log group for the NestJS service in CloudWatch
  const logGroup = new aws.cloudwatch.LogGroup(`${STACK_NAME}-nestjsLogGroup`);

  /* Create a Fargate service task that can scale out. 
  Super slick! this resource will also create and attach aws.iam.Role 
*/
  const _appService = new awsx.classic.ecs.FargateService(`${STACK_NAME}-svc`, {
    cluster,
    taskDefinitionArgs: {
      container: {
        image: img.imageUri,
        cpu: 102 /*10% of 1024*/,
        memory: 50 /*MB*/,
        portMappings: [api],
        logConfiguration: {
          logDriver: 'awslogs',
          options: {
            'awslogs-group': logGroup.name,
            'awslogs-region': 'eu-west-1',
            'awslogs-stream-prefix': 'nestjs',
          },
        },
      },
    },
    desiredCount: 1,
    waitForSteadyState: false,
  });

  return { serviceUrl: alb.loadBalancer.dnsName, cluster };
}
