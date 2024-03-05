import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

const config = {
  targetDomain: 'dev.mpi-holdings.com',
  includeWWW: true,
};

export function createARecord(cdn) {
  const aRecord = createAliasRecord(config.targetDomain, cdn);

  if (config.includeWWW) {
    const cnameRecord = createWWWAliasRecord(config.targetDomain, cdn);
  }

  return {
    cloudFrontDomain: cdn.domainName,
    aliases: aRecord.aliases,
    targetDomainEndpoint: `https://${config.targetDomain}/`,
  };
}

export function getDomainAndSubdomain(domain: string): {
  subdomain: string;
  parentDomain: string;
} {
  console.log('domain', domain)
  const parts = domain.split('.');
  console.log('parts', parts)
  if (parts.length < 2) {
    throw new Error(`No TLD found on ${domain}`);
  }
  // No subdomain, e.g. awesome-website.com.
  if (parts.length === 2) {
    return { subdomain: '', parentDomain: domain };
  }

  const subdomain = parts[0];
  parts.shift(); // Drop first element.
  return {
    subdomain,
    // Trailing "." to canonicalize domain.
    parentDomain: parts.join('.') + '.',
  };
}

// Creates a new Route53 DNS record pointing the domain to the CloudFront distribution.
function createAliasRecord(
  targetDomain: string,
  distribution: aws.cloudfront.Distribution
): aws.route53.Record {
  const domainParts = getDomainAndSubdomain(targetDomain);
  const hostedZoneId = aws.route53
    .getZone({ name: domainParts.parentDomain }, { async: true })
    .then((zone) => zone.zoneId);
  return new aws.route53.Record(targetDomain, {
    name: domainParts.subdomain,
    zoneId: hostedZoneId,
    type: 'A',
    aliases: [
      {
        name: distribution.domainName,
        zoneId: distribution.hostedZoneId,
        evaluateTargetHealth: true,
      },
    ],
  });
}

function createWWWAliasRecord(
  targetDomain: string,
  distribution: aws.cloudfront.Distribution
): aws.route53.Record {
  const domainParts = getDomainAndSubdomain(targetDomain);
  const hostedZoneId = aws.route53
    .getZone({ name: domainParts.parentDomain }, { async: true })
    .then((zone) => zone.zoneId);

  return new aws.route53.Record(`${targetDomain}-www-alias`, {
    name: `www.${targetDomain}`,
    zoneId: hostedZoneId,
    type: 'A',
    aliases: [
      {
        name: distribution.domainName,
        zoneId: distribution.hostedZoneId,
        evaluateTargetHealth: true,
      },
    ],
  });
}
