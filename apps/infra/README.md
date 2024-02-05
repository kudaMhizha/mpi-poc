# Infrastructure

## This project was bootsrapped using @nx-extend/pulumi 

<a href="https://www.npmjs.com/package/@nx-extend/pulumi" rel="nofollow">
  <img src="https://badgen.net/npm/v/@nx-extend/pulumi" alt="@nx-extend/pulumi NPM package">
</a>

**Nx plugin for deploying your resources with [pulumi](https://www.pulumi.com/)**.

## Setup

This package expects pulumi to be already installed and available.

### Installation

```bash
brew install pulumi/tap/pulumi
```
or download the installation [file](https://www.pulumi.com/docs/install/)

### Configure Pulumi to access your AWS account

```bash
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID> && export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
```

If this is your first time running pulumi new or other pulumi commands, you may be prompted to log in to Pulumi Cloud.
```bash
pulumi login
```



### The most common commands in the CLI that you’ll be using are as follows:

``pulumi new``: creates a new project using a template
``pulumi stack``: manage your stacks (at least one is required to perform an update)
``pulumi config``: configure variables such as keys, regions, and so on
``pulumi up``: preview and deploy changes to your program and/or infrastructure
``pulumi preview``: preview your changes explicitly before deploying
``pulumi destroy``: destroy your program and its infrastructure when you’re done

[read more...](https://www.pulumi.com/docs/cli/commands/)