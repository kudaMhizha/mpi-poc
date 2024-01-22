import * as auth from './stack/auth';
import * as fileRepository from './stack/bucket';
import * as database from './stack/rds';
import * as container from './container';

const bucket = fileRepository.createBucket();

const userPoolDetails = auth.createUserPool();

const ecs = container.createDockerImage();

const rds = database.createDBInstance(ecs.cluster);

// Exports
export const bucketName = bucket.id;
export const userPool = userPoolDetails.userPoolId;
export const databaseEndpoint = rds.postgresEndpoint;
export const serviceEndpoint = ecs.serviceUrl;
export const ecsClusterId = ecs.cluster.id;
