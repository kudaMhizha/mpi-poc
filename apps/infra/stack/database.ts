import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import {Cluster} from '@pulumi/awsx/classic/ecs';

const STACK_NAME = pulumi.getStack();
const DB_NAME = 'mpidb';

export function createDBInstance(cluster: Cluster) {
  // TODO: Create a new RDS instance within the VPC of the ECS cluster
  const dbSubnetGroup = new aws.rds.SubnetGroup(`${STACK_NAME}-dbsubnetgroup`, {
    subnetIds: cluster.vpc.getSubnetsIds('public'), // move to private sub
  });

  // Create a new KMS key for encrypting the RDS instance master user password
  // const kms = new aws.kms.Key(`${STACK_NAME}-kms`, {
  //   description: 'KMS Key for RDS PostgreSQL instance',
  // });

  /* 
  REF: https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance/#allowmajorversionupgrade_nodejs 
  */
  const rds = new aws.rds.Instance(`${STACK_NAME}-db`, {
    allocatedStorage: 10,
    dbName: DB_NAME,
    engine: 'postgres',
    engineVersion: '15.5',
    instanceClass: aws.rds.InstanceTypes.T3_Micro,
    // manageMasterUserPassword: true,
    // masterUserSecretKmsKeyId: kms.keyId,
    username: `ecs`,
    password: 'password',
    dbSubnetGroupName: dbSubnetGroup.id,
    vpcSecurityGroupIds: [cluster.securityGroups[0].id],
    parameterGroupName: 'default.postgres15',

    backupRetentionPeriod: 7,
    skipFinalSnapshot: true, // TODO: update to false
    finalSnapshotIdentifier: `${STACK_NAME}-finalSnapshotIdentifier`,
    allowMajorVersionUpgrade: true,
    // storageEncrypted: true,
    // performanceInsightsEnabled: true, for PROD
    // enabledCloudwatchLogsExports: pulumi.interpolate('postgresql,upgrade'),
    // multiAz: true,
    applyImmediately: true,
    publiclyAccessible: true,
    // tags: `${STACK_NAME}-db`
  });

  return {
    postgresEndpoint: rds.endpoint,
    dbAddress: rds.address,
    dbName: rds.dbName,
    dbPassword: rds.password,
    dbUser: rds.username,
    dbSubnetGroupName: dbSubnetGroup.id,
  };
}
