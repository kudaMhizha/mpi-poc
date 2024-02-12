import * as pulumi from "@pulumi/pulumi";
import * as github from "@pulumi/github";

// const config = new pulumi.Config();
// const githubToken = config.requireSecret("githubToken");

const repositoryOwner = "kudaMhizha";
const repositoryName = "mpi-poc";

export function setGithubActionSecret() {
  const ghProvider = new github.Provider("gh-provider", {
    owner: repositoryOwner,
    token: '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'
});

// Retrieve the existing repository
const repo = github.getRepository({
  name: repositoryName,
  // token: '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'
}, { provider: ghProvider,  });

// Create a GitHub Actions secret
const secretName = "TEST_URL";
const secretValue = "postgresql://test:%23pass12345@test-dbbbe904f.c5s0ukaqqu5c.eu-west-1.rds.amazonaws.com:5432/ecsdb";

const secret = new github.ActionsSecret(`${repositoryName}/${secretName}`, {
    repository: repositoryName,
    secretName: secretName,
  plaintextValue: secretValue,
}, { provider: ghProvider });

  return { githubSecretName: secret.secretName };
}
