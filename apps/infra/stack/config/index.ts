import * as pulumi from '@pulumi/pulumi';

export interface AppConfig {
  accesskeyId: pulumi.Output<string>;
  accessSecretKey: pulumi.Output<string>;
  region: pulumi.Output<string>;
  dbName: pulumi.Output<string>;
  dbUserName: pulumi.Output<string>;
  dbPassword: pulumi.Output<string>;
  stackName: string;
}

export interface CloudfrontConstants {
  CACHE_POLICY_ID: string;
  ORIGIN_REQUEST_POLICY_ID: string;
  ALLOWED_METHODS: string[];
  CACHED_METHODS: string[];
  PRICED_CLASS: string;
}

export function getConfig(): AppConfig {
  const config = new pulumi.Config();

  return {
    accesskeyId: config.requireSecret('AWS_ACCESS_KEY_ID'),
    accessSecretKey: config.requireSecret('AWS_SECRET_ACCESS_KEY'),
    region: config.requireSecret('REGION'),
    dbName: config.requireSecret('DB_NAME'),
    dbUserName: config.requireSecret('DB_USER_NAME'),
    dbPassword: config.requireSecret('DB_PASSWORD'),
    stackName: pulumi.getStack(),
  };
}

export function getConstants(): {cloudfront: CloudfrontConstants} {
  const cloudfront: CloudfrontConstants = {
    /* Using the managed cache policies
    @see: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html 
    */
    CACHE_POLICY_ID: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad',
    ORIGIN_REQUEST_POLICY_ID: '216adef6-5c7f-47e4-b989-5492eafa07d3',
    ALLOWED_METHODS: [
      'HEAD',
      'DELETE',
      'POST',
      'GET',
      'OPTIONS',
      'PUT',
      'PATCH',
    ],
    CACHED_METHODS: ['GET', 'HEAD', 'OPTIONS'],
    PRICED_CLASS: 'PriceClass_100',
  };
  return {
    cloudfront,
  };
}
