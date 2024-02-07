import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
/**
 * Create a lambda layer that contains production only dependencies.
 *
 * fetching the production dependencies from the webpack generated package.json
 *
 * 🤔 later on add .zip
 */
export const nodeModulesLayer: aws.lambda.LayerVersion =
  new aws.lambda.LayerVersion('node_modules-layer', {
    code: new pulumi.asset.AssetArchive({
      'nodejs/node_modules': new pulumi.asset.FileArchive(
        '../../dist/apps/infra/node_modules'
      ),
    }),
    // this layer should only be used with Node 12 or higher
    compatibleRuntimes: [aws.lambda.NodeJS12dXRuntime],
    layerName: 'node_modules-layer',
  });
