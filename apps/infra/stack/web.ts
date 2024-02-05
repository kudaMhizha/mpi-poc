import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as synced from '@pulumi/synced-folder';
import * as path from 'path';
import {updateDefaultS3Config} from '../utils';

const STACK_NAME = pulumi.getStack();
const callerIdentity = pulumi.output(aws.getCallerIdentity({}));
const buildDirectory = '../../../dist/apps/web';
const indexDocument = 'index.html';
const CDN_TLT = 600;

export function deployWeb() {
  const pathToWebsiteContents = path.resolve(__dirname, buildDirectory);

  console.info('Uploading contents from...', pathToWebsiteContents);

  const bucket = new aws.s3.Bucket(`${STACK_NAME}-site-bucket`, {
    website: {
      indexDocument,
    },
    versioning: {
      enabled: true,
    },
  });

  updateDefaultS3Config(bucket, 'site');

  const syncedFolder = new synced.S3BucketFolder(
    `${STACK_NAME}-site-synced-folder`,
    {
      path: pathToWebsiteContents,
      bucketName: bucket.bucket,
      acl: aws.s3.PublicReadAcl,
    },
    {ignoreChanges: []} // Ensure always updated
  );

  // Create an Origin Access Control for CloudFront
  const originAccessControl = new aws.cloudfront.OriginAccessControl(
    `${STACK_NAME}-site-oac`,
    {
      description: `${STACK_NAME} environment OAC`,
      originAccessControlOriginType: 's3',
      signingBehavior: 'always',
      signingProtocol: 'sigv4',
    },
    {dependsOn: syncedFolder}
  );

  const logBucket = createLogBucket();

  const cdn = new aws.cloudfront.Distribution(
    `${STACK_NAME}-site-cdn`,
    {
      enabled: true,
      defaultRootObject: indexDocument,
      comment: `This a distribution for the ${STACK_NAME} environment for www.mpi.${STACK_NAME}.co.za`,
      origins: [
        {
          originId: bucket.arn,
          domainName: bucket.bucketRegionalDomainName,
          originAccessControlId: originAccessControl.id,
        },
      ],
      restrictions: {
        geoRestriction: {
          restrictionType: 'none',
        },
      },
      defaultCacheBehavior: {
        targetOriginId: bucket.arn,
        viewerProtocolPolicy: 'redirect-to-https',
        allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
        cachedMethods: ['GET', 'HEAD', 'OPTIONS'],
        forwardedValues: {
          queryString: true,
          cookies: {forward: 'all'},
        },
        minTtl: CDN_TLT,
        defaultTtl: CDN_TLT,
        maxTtl: CDN_TLT,
      },
      priceClass: 'PriceClass_100',
      customErrorResponses: [
        {
          errorCode: 404,
          responsePagePath: `/${indexDocument}`,
          responseCode: 200,
        },
      ],
      viewerCertificate: {
        cloudfrontDefaultCertificate: true,
      },
      loggingConfig: {
        bucket: logBucket.bucketRegionalDomainName,
        includeCookies: false,
        prefix: `${STACK_NAME}-cdn-logs/`,
      },
    },
    {dependsOn: syncedFolder}
  );

  /* 
    WHY: A bit weird, but this seems to be the easiest way to get Output<T> => T. 
        - You can't run string operations on Output<String>.
    REF: https://www.pulumi.com/docs/concepts/inputs-outputs
  */
  const policyCondition = callerIdentity.accountId.apply(accountId => {
    return bucket.id.apply(bucketId => {
      return {
        sourceArn: `arn:aws:cloudfront::${accountId}:distribution/${bucketId}`,
      };
    });
  });

  new aws.s3.BucketPolicy(
    `${STACK_NAME}-oac-bucketPolicy`,
    {
      bucket: bucket.id,
      policy: pulumi.jsonStringify({
        Version: '2012-10-17',
        Id: 'PolicyForCloudFrontPrivateContent',
        Statement: [
          {
            Sid: 'AllowCloudFrontServicePrincipalReadOnly',
            Effect: 'Allow',
            Principal: {
              Service: 'cloudfront.amazonaws.com',
            },
            Action: ['s3:GetObject'],
            Resource: [pulumi.interpolate`${bucket.arn}/*`],
            Condition: {
              StringEquals: {
                'AWS:SourceArn': policyCondition.sourceArn,
              },
            },
          },
        ],
      }),
    },
    {dependsOn: cdn}
  );

  return {
    cdnHostname: cdn.domainName,
    cdnURL: pulumi.interpolate`https://${cdn.domainName}`,
    originHostname: bucket.websiteEndpoint,
    originURL: pulumi.interpolate`http://${bucket.websiteEndpoint}`,
    s3BucketName: bucket.bucket,
    cloudFrontDistributionId: cdn.id,
    bucketId: bucket.id,
  };
}

function createLogBucket(): aws.s3.Bucket {
  const logBucket = new aws.s3.Bucket(`${STACK_NAME}-cdn-logBucket`, {
    acl: 'private', // Private to ensure logs are not publicly accessible
    forceDestroy: true,
  });

  new aws.s3.BucketOwnershipControls(
    `${STACK_NAME}-cdn-logbucketOwnershipControls`,
    {
      bucket: logBucket.id,
      rule: {
        objectOwnership: 'BucketOwnerPreferred',
      },
    }
  );

  return logBucket;
}