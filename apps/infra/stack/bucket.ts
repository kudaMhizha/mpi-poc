import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import {updateDefaultS3Config} from '../utils';

const STACK_NAME = pulumi.getStack();

/*
 * TODO: create OAC for bucket
    const originAccessControl = new aws.cloudfront.OriginControl(
    `${STACK_NAME}-originAccessControl`
    @see: https://www.pulumi.com/ai/answers/1d401f22-3c75-4e22-a553-e6d9266dca17
  ); 
 */
export function createFileRepository() {
  const bucket = new aws.s3.Bucket(`${STACK_NAME}-file-repository`);

  updateDefaultS3Config(bucket, 'fileRepo');

  return {bucketId: bucket.id};
}

export function createLogBucket(name: string): aws.s3.Bucket {
  const logBucket = new aws.s3.Bucket(`${STACK_NAME}-${name}`, {
    acl: 'private', // Private to ensure logs are not publicly accessible
    forceDestroy: true,
  });

  new aws.s3.BucketOwnershipControls(
    `${STACK_NAME}-${name}-OwnershipControls`,
    {
      bucket: logBucket.id,
      rule: {
        objectOwnership: 'BucketOwnerPreferred',
      },
    }
  );

  return logBucket;
}
