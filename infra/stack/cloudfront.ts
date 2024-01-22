import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { STACK_NAME } from './utils';

const config = new pulumi.Config();

//TODO: WIP - test deployment
export function deployWeb() {
  const errorDocument = config.get('errorDocument') || 'error.html';
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
  const _siteContents = new aws.s3.BucketObject('index.html', {
    bucket: siteBucket,
    source: new pulumi.asset.FileAsset('./build/index.html'),
    contentType: 'text/html',
  });

  // Create an OriginAccessIdentity for CloudFront
  const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(
    `${STACK_NAME}-originAccessIdentity`
  );

  // Create a CloudFront distribution that points to the S3 bucket for the website
  const cdn = new aws.cloudfront.Distribution(`${STACK_NAME}-cdn`, {
    enabled: true,
    origins: [
      {
        originId: siteBucket.arn,
        domainName: siteBucket.websiteEndpoint,
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
        queryString: false,
        cookies: { forward: 'none' },
      },
      minTtl: 0,
      defaultTtl: 3600,
      maxTtl: 86400,
    },
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
  });

  // Output the names of the bucket and CloudFront distribution
  return {
    cdnDomain: cdn.domainName,
    cdnURL: `https://${cdn.domainName}`,
    originHostname: siteBucket.websiteEndpoint,
    originURL: `http://${siteBucket.websiteEndpoint}`,
    s3BucketName: siteBucket.bucket,
    cloudFrontDistributionId: cdn.id,
  };
}
