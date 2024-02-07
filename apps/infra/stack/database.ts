import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import {Cluster} from '@pulumi/awsx/classic/ecs';
import * as config from './config';

const STACK_NAME = config.getConfig().stackName;
const DB_NAME = config.getConfig().dbName;
const DB_USER_NAME = config.getConfig().dbUserName;
const DB_PASSWORD = config.getConfig().dbPassword;

export function createDBInstance(cluster: Cluster) {
  const ENGINE = 'postgres';
  const ENGINE_VERSION = '15.5';
  const PARAMETER_GROUP_NAME = 'default.postgres15';

  const dbSubnetGroup = new aws.rds.SubnetGroup(`${STACK_NAME}-dbsubnetgroup`, {
    subnetIds: cluster.vpc.getSubnetsIds('public'), // TODO: move to private sub x setup SSH tunnel.
  });

  /* 
  @see: https://www.pulumi.com/registry/packages/aws/api-docs/rds/instance/#allowmajorversionupgrade_nodejs 
  */
  const rds = new aws.rds.Instance(`${STACK_NAME}-db`, {
    allocatedStorage: 10,
    dbName: DB_NAME,
    engine: ENGINE,
    engineVersion: ENGINE_VERSION,
    instanceClass: aws.rds.InstanceTypes.T3_Micro,
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    dbSubnetGroupName: dbSubnetGroup.id,
    vpcSecurityGroupIds: [cluster.securityGroups[0].id],
    parameterGroupName: PARAMETER_GROUP_NAME,

    backupRetentionPeriod: 7,
    skipFinalSnapshot: true, // TODO: update to false
    finalSnapshotIdentifier: `${STACK_NAME}-finalSnapshotIdentifier`,
    allowMajorVersionUpgrade: true,
    applyImmediately: true,
    publiclyAccessible: true,
    /* 
    storageEncrypted: true,
    performanceInsightsEnabled: true, for PROD
    enabledCloudwatchLogsExports: pulumi.interpolate('postgresql,upgrade'),
    multiAz: true,
    applyImmediately: true,
    publiclyAccessible: true,
    tags: `${STACK_NAME}-db`
    */
  });
  console.log('DB', pulumi.interpolate`postgresql://${rds.username}:${rds.password}@${rds.endpoint}/${rds.dbName}`)

  const dbCredentials = pulumi.all(
    [rds.username, rds.password, rds.endpoint, rds.dbName])
    .apply(([username, password, endpoint, dbName]) => {
      return {
          url: pulumi.interpolate`postgresql://${username}:${password}@${endpoint}/${dbName}`,
       };
  })

  return {
    postgresEndpoint: rds.endpoint,
    dbAddress: rds.address,
    dbName: rds.dbName,
    dbPassword: rds.password,
    dbUser: rds.username,
    dbSubnetGroupName: dbSubnetGroup.id,
    dbConnectionString: dbCredentials.url,
  };
}
//postgresql://ecs:password@ecs-dev-db17b7a04.c5s0ukaqqu5c.eu-west-1.rds.amazonaws.com:5432/mpidb
