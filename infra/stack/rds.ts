import * as aws from '@pulumi/aws';
import { Cluster } from '@pulumi/awsx/classic/ecs';
import { STACK_NAME } from './utils';


export function createDBInstance(cluster: Cluster) {
  // TODO: Create a new RDS instance within the VPC of the ECS cluster
  const dbSubnetGroup = new aws.rds.SubnetGroup(`${STACK_NAME}-dbsubnetgroup`, {
    subnetIds: cluster.vpc.getSubnetsIds('public'), // move to private sub
  });

  // Create a new KMS key for encrypting the RDS instance master user password
  const kms = new aws.kms.Key(`${STACK_NAME}-kms`, {
    description: 'KMS Key for RDS PostgreSQL instance',
  });

  const postgresInstance = new aws.rds.Instance(`${STACK_NAME}-db`, {
    allocatedStorage: 10,
    dbName: 'mpiDB',
    engine: 'postgres',
    engineVersion: '15.5',
    instanceClass: aws.rds.InstanceTypes.T3_Micro,
    manageMasterUserPassword: true,
    masterUserSecretKmsKeyId: kms.keyId,
    username: `${STACK_NAME}`,
    dbSubnetGroupName: dbSubnetGroup.id,
    vpcSecurityGroupIds: [cluster.securityGroups[0].id],
    parameterGroupName: 'default.postgres15',
    skipFinalSnapshot: true, // TODO: update to false 
    finalSnapshotIdentifier: `${STACK_NAME}-finalSnapshotIdentifier`
  });

  return { postgresEndpoint: postgresInstance.endpoint };
}
