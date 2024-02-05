import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { STACK_NAME } from './stack/utils';

const config = new pulumi.Config();

/* TODO: WIP - test deployment 
REF: https://github.com/pulumi/examples/blob/master/aws-ts-static-website/index.ts
*/
export function deployWeb() {
  const errorDocument = config.get('errorDocument') || 'index.html';
  const indexDocument = config.get('indexDocument') || 'index.html';
  // const path = config.get("path") || "./dist";

  // Create an S3 bucket configured for website hosting
  const siteBucket = new aws.s3.Bucket(`${STACK_NAME}-siteBucket`, {
    website: {
      errorDocument: errorDocument,
      indexDocument: indexDocument,
      routingRules: JSON.stringify([
        {
          Condition: {
            HttpErrorCodeReturnedEquals: '404',
          },
          Redirect: {
            ReplaceKeyWith: 'index.html',
          },
        },
      ]),
    },
  });

  // Upload the contents of the 'build' directory in the React app to the S3 bucket
  const sourcePath = '../dist/apps/web';
  
  // Convert the directory and its contents into a `.zip` file asset.
  const webAppArchive = new pulumi.asset.AssetArchive({
    "webApp": new pulumi.asset.FileArchive(sourcePath),
  });

  const _siteContents = new aws.s3.BucketObject(
    `${STACK_NAME}-bucket-object`,
    {
      key: `${STACK_NAME}-bucket-object`,
      bucket: siteBucket,
      source: webAppArchive, //new pulumi.asset.FileAsset('../dist/apps/web'),
      contentType: 'application/zip', //text/html
      acl: 'public-read',
    },
    {
      parent: siteBucket,
    }
  );

  // logsBucket is an S3 bucket that will contain the CDN's request logs.
  // const logsBucket = new aws.s3.Bucket(`${STACK_NAME}-cdn-logs`, {
  //   bucket: `${STACK_NAME}-sitebucket-logs`,
  //   acl: 'log-delivery-write',
  // });

  // Create an OriginAccessIdentity for CloudFront
  const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(
    `${STACK_NAME}-originAccessIdentity`
  );

  // Create a CloudFront distribution that points to the S3 bucket for the website
  const cdn = new aws.cloudfront.Distribution(`${STACK_NAME}-cdn`, {
    enabled: true,
    comment: `This a distribution for the ${STACK_NAME} environment for www.${STACK_NAME}.co.za`,
    origins: [
      {
        originId: siteBucket.arn,
        domainName: siteBucket.bucketRegionalDomainName,
        s3OriginConfig: {
          originAccessIdentity:
            originAccessIdentity.cloudfrontAccessIdentityPath,
        },
      },
    ],
    restrictions: {
      geoRestriction: {
        restrictionType: 'none',
      },
    },
    defaultCacheBehavior: {
      targetOriginId: siteBucket.arn,
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
    priceClass: "PriceClass_100",
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
  //   loggingConfig: {
  //     bucket: logsBucket.bucketRegionalDomainName,
  //     includeCookies: false,
  //     prefix: `${STACK_NAME}/`,
  // },
  });

  const _bucketPolicy = new aws.s3.BucketPolicy(`${STACK_NAME}-bucketPolicy`, {
    bucket: siteBucket.id, 
    policy: pulumi.jsonStringify({
        Version: "2012-10-17",
        Statement: [
            {
            Effect: "Allow",
            Principal: {
                AWS: originAccessIdentity.iamArn,
            }, // Only allow Cloudfront read access.
            Action: ["s3:GetObject"],
            Resource: [pulumi.interpolate `${siteBucket.arn}/*`], // Give Cloudfront access to the entire bucket.
            },
        ],
    },
)});

  // Output the names of the bucket and CloudFront distribution
  return {
    cdnDomain: cdn.domainName,
    cdnURL: pulumi.interpolate`https://${cdn.domainName}`,
    originHostname: siteBucket.websiteEndpoint,
    originURL: `http://${siteBucket.websiteEndpoint}`,
    s3BucketName: siteBucket.bucket,
    cloudFrontDistributionId: cdn.id,
  };
}
