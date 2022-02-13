#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ClientStack } from '../lib/client-stack';
import { ApiStack } from '../lib/api-stack';

const app = new cdk.App();
new ClientStack(app, 'RadioBoiseClientStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

new ApiStack(app, 'RadioBoiseApiStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});