import * as awsx from "@pulumi/awsx";

export function createVpc() {
  // Fetch the default VPC for the current AWS region.
  const vpc = new awsx.ec2.DefaultVpc("default-vpc");

  return {
    vpcId: vpc.vpcId,
    vpcPrivateSubnetIds: vpc.privateSubnetIds,
    vpcPublicSubnetIds: vpc.publicSubnetIds,
  };
}
