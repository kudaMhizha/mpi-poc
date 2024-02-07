import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import {BucketOwnershipControls, BucketPublicAccessBlock} from '@pulumi/aws/s3';

const STACK_NAME = pulumi.getStack();

export function updateDefaultS3Config(
  bucket: aws.s3.Bucket,
  prefix: string
): {
  publicAccessBlock: BucketPublicAccessBlock;
  bucketOwnershipControl: BucketOwnershipControls;
} {
  /* 
  WHY: S3 made some security changes to bucket config, enable this to allow uploads.
  @see: https://stackoverflow.com/questions/76330998/aws-s3-invalidbucketaclwithobjectownershipbucket-cannot-have-acls-set-with-obje/76335671#76335671
  */
  const bucketOwnershipControl = new aws.s3.BucketOwnershipControls(
    `${STACK_NAME}-${prefix}-bucketOwnershipControls-ObjectWriter`,
    {
      bucket: bucket.id,
      rule: {
        objectOwnership: 'ObjectWriter',
      },
    }
  );

  const publicAccessBlock = new aws.s3.BucketPublicAccessBlock(
    `${STACK_NAME}-${prefix}-public-access-allow`,
    {
      bucket: bucket.id,
      blockPublicAcls: false,
    }
  );

  new aws.s3.BucketPolicy(
    `${STACK_NAME}-${prefix}-bucketPolicy`,
    {
      bucket: bucket.id,
      policy: pulumi.jsonStringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject', 's3:PutObject'],
            Resource: [pulumi.interpolate`${bucket.arn}/*`],
          },
        ],
      }),
    },
    {dependsOn: [publicAccessBlock, bucketOwnershipControl]}
  );

  return {publicAccessBlock, bucketOwnershipControl};
}
