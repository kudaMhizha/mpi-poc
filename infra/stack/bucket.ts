import * as aws from '@pulumi/aws';
import { STACK_NAME } from '../utils';

/*
 * TODO: create OAI for bucket
    const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(
    `${STACK_NAME}-originAccessIdentity`
  ); 
 */
export function createBucket() {
  const bucket = new aws.s3.Bucket(`${STACK_NAME}-uploads`);
  return bucket;
}
