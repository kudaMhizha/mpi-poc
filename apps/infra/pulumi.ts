import * as bucket from './stack/bucket';
import * as web from './stack/web';
import * as auth from './stack/auth';
import * as container from './stack/container';
import * as github from './stack/github';

// const githubSecret = github.setGithubActionSecret();

// export const githubSecretName = githubSecret.githubSecretName;

const fileRepository = bucket.createFileRepository();
// const webApp = web.deployWeb();
const userPool = auth.createUserPool();
const backend = container.createContainer({
  userPoolId: userPool.userPoolId,
  userPoolClientId: userPool.userPoolClientId,
});

export const bucketName = fileRepository.bucketId;
// export const cdnURL = webApp.cdnURL;
export const userPoolId = userPool.userPoolId;
export const userPoolArn = userPool.userPoolArn;
export const databaseUrl = backend.databaseUrl;
export const repositoryUrl = backend.repositoryUrl;
export const imageUri = backend.imageUri;
