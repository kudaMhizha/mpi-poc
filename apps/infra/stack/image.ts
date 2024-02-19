import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import * as path from 'path';
import * as config from './config';

const STACK_NAME = config.getConfig().stackName;

export function createRepository(databaseUrl) {
  const PLATFORM = 'linux/amd64';

  const pathToWebsiteContents = path.resolve(__dirname, '../../../');

  console.info('Uploading Repository from...', pathToWebsiteContents);
  console.info('Using DATABASE_URL...', databaseUrl);

  const repo = new awsx.ecr.Repository(`${STACK_NAME}-repo`, {
    forceDelete: true,
    tags: { Name: `${STACK_NAME}-ecr-repo` },
  });

  /* Build and publish a Docker image to a private ECR registry */
  // const img = new awsx.ecr.Image(`${STACK_NAME}-ecr-image`, {
  //   repositoryUrl: repo.url,
  //   context: pathToWebsiteContents,
  //   platform: PLATFORM,
  //   args: {
  //     DATABASE_URL: databaseUrl,
  //   },
  // });

  const imageUri = pulumi.interpolate`${repo.url}:latest`;
  //730335240006.dkr.ecr.eu-west-1.amazonaws.com/dev-repo-f23851a return 730335240006.dkr.ecr.eu-west-1
  const registryUrl = repo.url.apply((url) => url.split('/')[0]);
  return {
    repoUrl: pulumi.interpolate`${registryUrl}`,
    imageUri,
    imageTag: pulumi.interpolate`${repo.repository.id}:latest`,
  };
}
