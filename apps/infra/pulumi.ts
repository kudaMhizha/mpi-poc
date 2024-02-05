// Deploys:
// - Network: VPC, Subnets, Security Groups
// - DB Backend: PostgreSQL api
import * as bucket from './stack/bucket';
import * as web from './stack/web';
import * as auth from './stack/auth';
import * as container from './stack/container';
import * as database from './stack/database';
import * as img from './stack/repo'

// const fileRepository = bucket.createFileRepository();
// const webApp = web.deployWeb();
// const userPool = auth.createUserPool();

// export const bucketName = fileRepository.bucketId;
// export const cdnURL = webApp.cdnURL;
// export const userPoolId = userPool.userPoolId;
const image = img.createRepo()
// const api = container.createContainer();

// const rds = database.createDBInstance();
// export const backendUrl = api.serviceUrl;
// export const databaseUrl = api.postgresEndpoint;
// export const databaseAddress = api.dbAddress;
// export const dbName = api.dbName;
// export const dbPassword = api.dbPassword;
// export const dbUser = api.dbUser;
// export const dbSubnetGroupName = api.dbSubnetGroupName;
// export const serviceUrl = api.serviceUrl
export const repoUrl = image.repoUrl;