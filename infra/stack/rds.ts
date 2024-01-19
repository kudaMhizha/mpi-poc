import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createDBInstance() {
  const dbSecret = new aws.kms.Key("example", { description: "Example KMS Key" });

  const db = new aws.rds.Cluster("postgresql", {
    availabilityZones: [
      "eu-west-1a",
      "eu-west-1b",
      "eu-west-1c",
    ],
    backupRetentionPeriod: 5,
    clusterIdentifier: "aurora-cluster-demo",
    databaseName: "testDB",
    engine: "aurora-postgresql",
    manageMasterUserPassword: true,
    masterUsername: "test",
    masterUserSecretKmsKeyId: dbSecret.keyId,
    preferredBackupWindow: "06:00-00:00",
  });

  return { arn: db.arn };
}

