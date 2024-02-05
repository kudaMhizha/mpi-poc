import * as auth from './stack/auth';
import * as fileRepository from './stack/bucket';
import * as database from './stack/rds';
// import * as cloudfront from './cloudfront';
import * as cloudfront from './web';
import * as container from './container';

const bucket = fileRepository.createBucket();

const userPoolDetails = auth.createUserPool();

const ecs = container.createContainer();

const rds = database.createDBInstance(ecs.cluster);

const web = cloudfront.webDeploy()

// Exports
export const uploadsBucket = bucket.id;
export const userPoolId = userPoolDetails.userPoolId;
export const userPoolClientId = userPoolDetails.userPoolClientId;
export const databaseEndpoint = rds.postgresEndpoint;
export const serviceEndpoint = ecs.serviceUrl;
export const ecsClusterId = ecs.cluster.id;
export const bucketId = web.bucketId;
export const cdnDomain = web.bucketDomain;
// export const cdnDomain = web.originHostname;
// export const cdnURL = web.cdnURL;
// export const siteBucket = web.s3BucketName;
// export const cloudFrontDistributionId = web.cloudFrontDistributionId