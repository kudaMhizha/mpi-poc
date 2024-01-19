## Pulumi Installation

To install Pulumi, follow these steps:

1. Visit the [Pulumi website](https://pulumi.com/docs/install/) and choose the appropriate installation method for your operating system.

2. Follow the installation instructions provided for your chosen method.

3. Once the installation is complete, verify that Pulumi is installed correctly by running the following command in your terminal:

  ```bash
  pulumi version
  ```

  If Pulumi is installed successfully, you should see the version number displayed.

4. Congratulations! You have successfully installed Pulumi. You can now proceed with setting up your Pulumi project.

## Configure Pulumi to access your AWS account

If you do not have the AWS CLI installed or plan on using Pulumi from within a CI/CD pipeline, [retrieve your access key ID and secret access key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) and then set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables on your workstation.

```
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID> && export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
```
or run ``` aws configure``` and follow the instructions...