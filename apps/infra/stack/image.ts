import * as awsx from '@pulumi/awsx';
import * as path from 'path';
import * as config from './config';

const STACK_NAME = config.getConfig().stackName;

export function createRepository(databaseUrl: string) {
  const PLATFORM = 'linux/amd64';
  const DATABASE_URL = databaseUrl

  const pathToWebsiteContents = path.resolve(__dirname, '../../../');
  console.info('Uploading Repository from...', pathToWebsiteContents);

  const repo = new awsx.ecr.Repository(`${STACK_NAME}-repo`, {
    forceDelete: true,
    tags: {Name: `${STACK_NAME}-ecr-repo`},
  });

  /* Build and publish a Docker image to a private ECR registry */
  const img = new awsx.ecr.Image(`${STACK_NAME}-ecr-image`, {
    repositoryUrl: repo.url,
    context: pathToWebsiteContents,
    platform: PLATFORM,
    args: {
      DATABASE_URL: DATABASE_URL,
    },
  });

  return {repoUrl: repo.url, imageUri: img.imageUri};
}
