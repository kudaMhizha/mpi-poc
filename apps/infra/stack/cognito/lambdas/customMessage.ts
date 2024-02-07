import * as aws from '@pulumi/aws';
import { baseRole } from '../../iam/iam';
import * as pulumi from '@pulumi/pulumi';
import { nodeModulesLayer } from '../../lambdaLayers/nodeModulesLayer';


export const customMessageLambda = new aws.lambda.Function(
  'cognito-custom-msg-fn',
  {
    runtime: 'nodejs20.x',
    handler: "index.handler",
    memorySize: 256,
    code: new pulumi.asset.AssetArchive({
      // we want the file name to be index.js as a standard across all lambdas
      'index.js': new pulumi.asset.FileAsset('../../dist/apps/infra/customMessage.js'),
    }),
    role: baseRole.arn,
    timeout: 30,
    layers: [nodeModulesLayer.arn],
  }
);
