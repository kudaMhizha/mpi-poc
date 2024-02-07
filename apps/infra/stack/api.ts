import * as pulumi from '@pulumi/pulumi';
import * as awsx from '@pulumi/awsx';
import * as aws from '@pulumi/aws';
import {
  ApplicationLoadBalancer,
  ApplicationListener,
} from '@pulumi/awsx/classic/lb';
import * as config from './config';
import {Cluster} from '@pulumi/awsx/classic/ecs';
import {createLogBucket} from './bucket';

const STACK_NAME = config.getConfig().stackName;

export function createApi(cluster: Cluster): {
  alb: ApplicationLoadBalancer;
  api: ApplicationListener;
  apiDomainName: pulumi.Output<string>;
} {
  const {
    CACHE_POLICY_ID,
    ORIGIN_REQUEST_POLICY_ID,
    ALLOWED_METHODS,
    CACHED_METHODS,
    PRICED_CLASS,
  } = config.getConstants().cloudfront;

  const API_PORT = 4000;
  /* 
  This crosswalk resource will automatically create:
  1. aws.ec2.SecurityGroup
  2. aws.lb.TargerGroup
  3. aws.lb.listener
  4. and uses the default AWS VPC and subnets!!
  */
  const alb = new awsx.classic.lb.ApplicationLoadBalancer(`${STACK_NAME}-lb`, {
    external: true,
    securityGroups: cluster.securityGroups,
  });

  const api = alb.createListener(`${STACK_NAME}-api`, {
    port: API_PORT,
    external: true,
    protocol: 'HTTP',
  });

  const logBucketName = 'api-logBucket';
  const logBucket = createLogBucket(logBucketName);

  const distribution = new aws.cloudfront.Distribution(
    `${STACK_NAME}-distribution`,
    {
      enabled: true,
      comment: `This a distribution for the ${STACK_NAME} environment API (backend) server`,
      origins: [
        {
          originId: alb.loadBalancer.arn,
          domainName: alb.loadBalancer.dnsName,
          customOriginConfig: {
            httpPort: API_PORT,
            httpsPort: 443,
            originProtocolPolicy: 'http-only',
            originSslProtocols: ['TLSv1.2'],
          },
        },
      ],
      restrictions: {
        geoRestriction: {
          restrictionType: 'none',
        },
      },
      defaultCacheBehavior: {
        targetOriginId: alb.loadBalancer.arn,
        viewerProtocolPolicy: 'redirect-to-https',
        allowedMethods: ALLOWED_METHODS,
        cachedMethods: CACHED_METHODS,
        cachePolicyId: CACHE_POLICY_ID,
        originRequestPolicyId: ORIGIN_REQUEST_POLICY_ID,
      },
      priceClass: PRICED_CLASS,
      httpVersion: 'http2',
      viewerCertificate: {
        cloudfrontDefaultCertificate: true,
      },
      loggingConfig: {
        bucket: logBucket.bucketRegionalDomainName,
        includeCookies: false,
        prefix: `${STACK_NAME}-api-logs/`,
      },
    },
    {dependsOn: api}
  );

  return {
    alb,
    api,
    apiDomainName: pulumi.interpolate`https://${distribution.domainName}`,
  };
}
