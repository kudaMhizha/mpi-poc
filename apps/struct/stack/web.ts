import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as synced from '@pulumi/synced-folder';
import * as path from 'path';

const STACK_NAME = 'dev'; ///Users/kudamhizha/Documents/MPI/mpi-poc/apps/dist/apps/web
const callerIdentity = pulumi.output(aws.getCallerIdentity({}));

export function deplyWeb() {
  const pathToWebsiteContents = path.resolve(
    __dirname,
    '../../../dist/apps/web'
  );

  console.info('pathToWebsiteContents...', pathToWebsiteContents);

  const bucket = new aws.s3.Bucket('dev-site-bucket', {
    website: {
      indexDocument: 'index.html',
    },
  });

  /* 
  WHY: S3 made some security changes to bucket config, enable this to allow uploads.
  REF: https://stackoverflow.com/questions/76330998/aws-s3-invalidbucketaclwithobjectownershipbucket-cannot-have-acls-set-with-obje/76335671#76335671
  */
  const bucketOwnershipControl = new aws.s3.BucketOwnershipControls(
    'dev-bucketOwnershipControls-ObjectWriter',
    {
      bucket: bucket.id,
      rule: {
        objectOwnership: 'ObjectWriter',
      },
    }
  );

  const publicAccessBlock = new aws.s3.BucketPublicAccessBlock(
    'dev-public-access-allow',
    {
      bucket: bucket.id,
      blockPublicAcls: false,
      ignorePublicAcls: false,
      blockPublicPolicy: true,
      restrictPublicBuckets: true,
    }
  );

  const bucketPolicy = new aws.s3.BucketPolicy(
    'dev-site-bucketPolicy',
    {
      bucket: bucket.id,
      policy: pulumi.jsonStringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject', 's3:PutObject'],
            Resource: [pulumi.interpolate`${bucket.arn}/*`],
          },
        ],
      }),
    },
    { dependsOn: [publicAccessBlock, bucketOwnershipControl] }
  );

  const syncedFolder = new synced.S3BucketFolder(
    'dev-site-synced-folder',
    {
      path: pathToWebsiteContents,
      bucketName: bucket.bucket,
      acl: aws.s3.PublicReadAcl,
    },
    { dependsOn: bucketPolicy }
  );

  // Create an Origin Access Control for CloudFront
  const originAccessControl = new aws.cloudfront.OriginAccessControl(
    'dev-site-oac',
    {
      description: 'Dev environment OAC',
      originAccessControlOriginType: 's3',
      signingBehavior: 'always',
      signingProtocol: 'sigv4',
    },
    { dependsOn: syncedFolder }
  );

  const logBucket = createLogBucket();

  const cdn = new aws.cloudfront.Distribution(
    `${STACK_NAME}-site-cdn`,
    {
      enabled: true,
      defaultRootObject: 'index.html',
      comment: `This a distribution for the ${STACK_NAME} environment for www.${STACK_NAME}.co.za`,
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
          cookies: { forward: 'all' },
        },
        minTtl: 600,
        defaultTtl: 600,
        maxTtl: 600,
      },
      priceClass: 'PriceClass_100',
      customErrorResponses: [
        {
          errorCode: 404,
          responsePagePath: '/index.html',
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
    { dependsOn: syncedFolder }
  );

  /* 
  WHY: A bit weird, but this seems to be the easiest way to get Output<T> => T. 
      - You can't run string operations on Output<T>.
  REF: https://www.pulumi.com/docs/concepts/inputs-outputs
  */
  const policyCondition = callerIdentity.accountId.apply((accountId) => {
    return bucket.id.apply((bucketId) => {
      return {
        sourceArn: `arn:aws:cloudfront::${accountId}:distribution/${bucketId}`,
      };
    });
  });

  const oacBucketPolicy = new aws.s3.BucketPolicy(
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
    { dependsOn: cdn }
  );

  /* 
  TODO: Block all public access for the S3 bucket. 
  Cloudfront will access the bucket using bucket policy.
  */

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
  const logBucket = new aws.s3.Bucket('dev-cdn-logBucket', {
    acl: 'private', // Private to ensure logs are not publicly accessible
    forceDestroy: true,
  });

  new aws.s3.BucketOwnershipControls('dev-cdn-logbucketOwnershipControls', {
    bucket: logBucket.id,
    rule: {
      objectOwnership: 'BucketOwnerPreferred',
    },
  });

  return logBucket;
}
