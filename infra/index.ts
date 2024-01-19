import * as pulumi from "@pulumi/pulumi";
import * as vpc from './stack/vpc';
import * as auth from './stack/auth'
import * as fileRepository from './stack/bucket'
import * as database from './stack/rds'

const vpcDetails = vpc.createVpc()

const stackOutputs = vpcDetails.vpcId.apply(value => {
  const name = 'uploads-' + value
  const bucket = fileRepository.createBucket(name);

  const userPoolDetails = bucket.arn.apply(value => {
    console.info('buckerARN:', value)
    return auth.createUserPool(value)
  })

  const databaseArn = database.createDBInstance()

  return {
    bucketName: bucket.id,
    userPoolId: userPoolDetails.userPoolId,
    databaseArn: databaseArn.arn
  }
})

// Exports
export const bucketName = stackOutputs.bucketName;
export const userPool = stackOutputs.userPoolId;
export const databaseArn = stackOutputs.databaseArn
