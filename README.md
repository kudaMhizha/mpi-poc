# MPI Holdings Monorepo

This repository contains the **MPI Holdings** Frontend & Backend code in a monorepo format.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This README should serve as a guide for both ends.

### Prerequisites

Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

#### Node >= 18

##### MacOS

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Creating an IAM user

You'll need to create an IAM user to programmatically interact with AWS resources. This user will allow you to configure our AWS CLI (command-line interface). You can follow this guide to [create new IAM users](https://sst.dev/chapters/create-an-iam-user.html)

##### Configure AWS CLI

You can install the AWS CLI (on Linux, macOS, or Unix) by running:

```
brew install awscli
```

If you are having some problems installing the AWS CLI or need Windows install instructions, refer to the [complete install instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

###### Add Your Access Key to AWS CLI

Your access keys will look something like this:

```
Access key ID: AKIAIOSFODNN7EXAMPLE
Secret access: key wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

Simply run the following with your Secret Key ID and your Access Key:

```
aws configure
```

##### Other

See the installation guides available @ nodejs.org:

https://nodejs.org/en/download/package-manager/

#### Yarn

```bash
npm i -g yarn
```

#### Docker

Docker installed on your system. If you haven't installed Docker yet, you can download and install it from the official Docker website: https://www.docker.com/get-started

#### Docker Compose

##### MacOS

```
brew install docker-compose
```

### Installing

Below is a series of step by step instructions that tell you how to get a development env running.

Create a local clone of the repository

```bash
git clone https://github.com/SovTech/mpi-holdings-monorepo.git
```

Enter the cloned repositories' directory

```bash
cd mpi-holdings-monorepo
```

Install the projects dependencies

```bash
yarn
```

Create a `.env` file based on the [.env.example template](.env.example) (at the time of writing, no additional env vars are required)

Export the contents of the created `.env` file to the current terminal session.

```bash
set -o allexport; source .env; set +o allexport
```

#### Starting the local database environment

```bash
cd tools/docker/dev && docker-compose up -d
```

Ensure your container is up and running. List the containers to get the port
```bash
docker-compose ps
```
will log:

```bash
NAME          IMAGE                 COMMAND                 SERVICE
xx-database   postgres:13-alpine   "docker-entrypoint.s…"   database   xx minutes ago   Up xx minutes   0.0.0.0:65491->5432/tcp
```

Check the container's IP address, run:
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <NAME>
```
this will be the HOST value on your DATABASE_URL.

Check the container 's Port number, run: 
```bash
docker inspect -f '{{range $p, $conf := .NetworkSettings.Ports}} {{$p}} -> {{$conf}} {{end}}' <NAME>
```
this will be the PORT value on your DATABASE_URL. 

Add the postgres connection URL to the environment variable DATABASE_URL with the format specified in the .env.example
```shell
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

#### Generate Prisma:

```bash
yarn prisma:migrate
```

```bash
yarn prisma:gen
```

```bash
yarn prisma:seed
```

To view the Visual Interface for Your Database, run the command below and go to `http://localhost:5555`
```bash
yarn prisma:studio
```

#### Starting the local environment

##### Prisma

```bash
yarn prisma:migrate
```

```bash
yarn prisma:gen
```

##### Web App
```bash
yarn web:dev
```

## Running the tests

```
yarn test
```

### Detail testing methods

Explain what these tests test and why

```
Give an example
```

## Environments

Below is a detailed list of the current deployed environments, how they can accessed and any other relevant information.

## Built With

Details of the tech stack that has been used.

### Frontend

- [React](https://reactjs.org/) - Client Framework
- [Tailwind CSS](https://tailwindcss.com/) - UI Framework
- [Vite](https://vitejs.dev/) - Frontend Tooling
- [ShadcnUI](https://ui.shadcn.com/) - Component Library
- [Zustand](https://github.com/pmndrs/zustand) - State Management
- [React Hook Form](https://github.com/pmndrs/zustand) - Forms Library
- [Zod](https://zod.dev/) - Schema Validation
- [Uppy](https://uppy.io/) - File Uploads

### Backend

##### Need Help?

### Authentication

### Data Access

### Communications

### Document & Media Storage

### Application Data Storage

## Environment Variables

These are the environment variables required to successfully deploy the application.

### Repository Variables

### Deployment Variables

## Architecture

### ERD

### Architecture Diagram

## Infrastructure

## Third-Party Integrations

## Services

## Web App Folder Structure

Below is a high level folder structure which should be maintained and adhered to for the duration of the build.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on the SovTech standard for commit messages and the accepted pull request process.

## Versioning

We use [SemVer](http://semver.org/) for versioning. Versioning occurs automatically in the pipelines using [Semantic Release](https://github.com/semantic-release/semantic-release). For the versions available, see the tags on this repository.

## Changelog

A running changelog can be found here: [CHANGELOG.md](CHANGELOG.md)

## Authors

- **Yatin Badal** <yatin@sov.tech>
- **Kuda Mhizha** <Kudakwaishe.mhizha@sovtech.com>
- **Kudzai Mabika** <kudzai.mabika@sovtech.com>

## Licenses

Place the result of `npx license-checker --summary` here

```
├─ MIT: 1653
├─ Apache-2.0: 130
├─ ISC: 110
├─ BSD-3-Clause: 67
├─ BSD-2-Clause: 34
├─ 0BSD: 6
├─ MIT*: 4
├─ CC0-1.0: 3
├─ (MIT OR CC0-1.0): 3
├─ (MIT OR Apache-2.0): 2
├─ MPL-2.0: 2
├─ CC-BY-4.0: 2
├─ UNKNOWN: 1
├─ Apache-2.0 AND MIT: 1
├─ Python-2.0: 1
├─ (Apache-2.0 OR MPL-1.1): 1
├─ Custom: https://github.com/testing-library/dom-testing-library/issues/260: 1
├─ (AFL-2.1 OR BSD-3-Clause): 1
├─ Public Domain: 1
├─ ODC-By-1.0: 1
├─ UNLICENSED: 1
├─ (WTFPL OR MIT): 1
├─ (BSD-2-Clause OR MIT OR Apache-2.0): 1
├─ (MIT AND BSD-3-Clause): 1
└─ Unlicense: 1
```

## Troubleshooting

List any common errors and their solutions

- Some common error
  > solution

## Meta

| Version | Author                                       | Date       |
| ------- | -------------------------------------------- | ---------- |
| 0.0.1   | Kuda Mhizha <kudakwaishe.mhizha@sovtech.com> | 22/12/2023 |
