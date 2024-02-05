import * as pulumi from '@pulumi/pulumi';
import * as awsx from '@pulumi/awsx';
import * as aws from '@pulumi/aws';
import * as database from './database';

const config = new pulumi.Config();
const skipResource = config.getBoolean('skipResource');
const STACK_NAME = pulumi.getStack();

export function createContainer() {
  /*
 * Here we are using AWSx Crosswalk libraries that capture higher-level AWS best practices rather 
   than mapping raw infrastructure constructs.
 * https://www.pulumi.com/blog/crosswalk-for-aws-1-0/
 */
  const cluster = new awsx.classic.ecs.Cluster(`${STACK_NAME}-cluster`);

  const rds = database.createDBInstance(cluster);

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
    port: 4000,
    external: true,
    protocol: 'HTTP',
  });

  // const repo = new awsx.ecr.Repository(`${STACK_NAME}-repo`, {
  //   forceDelete: true,
  // }); // TODO: figure out why repo is being replaced on each deploy.

  // // Build and publish a Docker image to a private ECR registry.
  // const img = new awsx.ecr.Image(`${STACK_NAME}-ecr-image`, {
  //   repositoryUrl: repo.url,
  //   context: '../../../',
  //   platform: 'linux/amd64',
  // });

  const img = aws.ecr.getImage({
    imageTag: "bb54ea28-container",
    repositoryName: "test-repo-dc7d111",
  });
  
  let uri:any = 'none'
  const imgUri = img.then((res) => {
    uri = res.imageUri
    return uri;
  }).catch((err) => { console.error(err)})
  console.info('Checking uri values...',{
    uri,
    imgUri
  })
  // Create a new log group for the NestJS service in CloudWatch
  const logGroup = new aws.cloudwatch.LogGroup(`${STACK_NAME}-nestjsLogGroup`);

  /* Create a Fargate service task that can scale out. 
  Super slick! this resource will also create and attach aws.iam.Role 
*/
  const _appService = new awsx.classic.ecs.FargateService(`${STACK_NAME}-svc`, {
    cluster,
    taskDefinitionArgs: {
      container: {
        environment: [
          {
            name: 'DATABASE_URL',
            value: pulumi.interpolate`postgresql://${rds.dbUser}:${rds.dbPassword}@${rds.postgresEndpoint}/${rds.dbName}`,
          },
        ],
        image: pulumi.interpolate`730335240006.dkr.ecr.eu-west-1.amazonaws.com/test-repo-dc7d111:16de73b4-container`,
        cpu: 512 /*50% of 1024*/,
        memory: 1024 /*MB*/,
        portMappings: [api],
        logConfiguration: {
          logDriver: 'awslogs',
          options: {
            'awslogs-group': logGroup.name,
            'awslogs-region': 'eu-west-1',
            'awslogs-stream-prefix': 'nestjs',
          },
        },
        // TODO: add environment { name, value }
      },
    },
    desiredCount: 1,
    waitForSteadyState: true,
    tags: { 'Name': `${STACK_NAME}-fargate-service` },
  });

  return { serviceUrl: alb.loadBalancer.dnsName };//, ...rds};
}
