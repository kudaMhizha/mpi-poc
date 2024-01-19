import * as aws from "@pulumi/aws";

export function createBucket(bucketName: string) {
  const bucket = new aws.s3.Bucket(bucketName);
  return bucket;
}