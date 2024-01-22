import * as aws from '@pulumi/aws';
import { STACK_NAME } from './utils';

export function createBucket() {
  const bucket = new aws.s3.Bucket(`${STACK_NAME}-uploads`);
  return bucket;
}
