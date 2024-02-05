import * as awsx from '@pulumi/awsx';
import * as path from 'path';

const STACK_NAME = 'test'

export function createRepo() {
  const pathToWebsiteContents =  path.resolve(__dirname, '../../../');
  console.info('Uploading contents from...', pathToWebsiteContents);
  const repo = new awsx.ecr.Repository(`${STACK_NAME}-repo`, {
    forceDelete: true,
    tags: { 'Name': `${STACK_NAME}-ecr-repo` }
  }); // TODO: figure out why repo is being replaced on each deploy.
  
  // Build and publish a Docker image to a private ECR registry.
  const img = new awsx.ecr.Image(`${STACK_NAME}-ecr-image`, {
    repositoryUrl: repo.url,
    context: pathToWebsiteContents,
    platform: 'linux/amd64',
    args: {
      'DATABASE_URL': 'postgresql://ecs:password@ecs-dev-db17b7a04.c5s0ukaqqu5c.eu-west-1.rds.amazonaws.com:5432/mpidb'
    },
  });
  
  return { repoUrl: repo.url, imageUri: img.imageUri }
}