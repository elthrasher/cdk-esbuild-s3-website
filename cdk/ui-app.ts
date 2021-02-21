import { App } from '@aws-cdk/core';
import { UIStack } from './ui-app-stack';

const app = new App();

new UIStack(app, 'UIStack', {
  description: 'UI Stack',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: 'ui-stack',
});
