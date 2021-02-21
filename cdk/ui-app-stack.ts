import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { BundlingDockerImage, CfnOutput, Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { execSync, ExecSyncOptions } from 'child_process';
import { copySync } from 'fs-extra';
import { join } from 'path';

export class UIStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      autoDeleteObjects: true,
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });

    const execOptions: ExecSyncOptions = { stdio: ['ignore', process.stderr, 'inherit'] };

    const bundle = Source.asset(join(__dirname, '../ui'), {
      bundling: {
        command: ['sh', '-c', 'echo "Docker build not supported. Please install esbuild."'],
        image: BundlingDockerImage.fromRegistry('alpine'),
        local: {
          tryBundle(outputDir: string) {
            try {
              execSync('esbuild --version', execOptions);
            } catch /* istanbul ignore next */ {
              return false;
            }
            execSync('npm run build', execOptions);
            copySync(join(__dirname, '../website'), outputDir, { ...execOptions, recursive: true });
            return true;
          },
        },
      },
    });

    new BucketDeployment(this, 'DeployWebsite', {
      destinationBucket: websiteBucket,
      sources: [bundle],
    });

    new CfnOutput(this, 'webUrl', { value: websiteBucket.bucketWebsiteUrl });
  }
}
