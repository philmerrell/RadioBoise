import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as cdk from 'aws-cdk-lib';

import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as certificateManager from 'aws-cdk-lib/aws-certificatemanager';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { EndpointType } from 'aws-cdk-lib/aws-apigateway';


export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const apiDomainName = 'radioboise-api.philmerrell.com';


    const sslCertArn = process.env.SSL_CERT_ARN;



    /**
     * Lambda - Function to host ExpressJS Api
     * @property - certArn
     */

    const apiLambda = new lambda.Function(this, 'ApiFunction', {
      code: new lambda.AssetCode('../api'),
      handler: 'lambda.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(10)
    });


    /**
     * Api Gateway -
     * @property clientDomainName - required to set the CORS allowed origins
     * @property apiDomainName - required to set the api domain name
     * @property certArn - Arn the the ssl cert used to create api gateway domain name
     * @property apiLambda - Instance of the lambda function that handles all requests from this api
     */

    const sslCert = certificateManager.Certificate.fromCertificateArn(this, 'SslCertArn', sslCertArn!);
    const zone = route53.HostedZone.fromLookup(this, 'GetHostedZone', {
      domainName: 'philmerrell.com',
    });

    const api = new apigateway.LambdaRestApi(this, 'AwsStarterApiGateway', {
      restApiName: 'Radio Boise Api',
      description: 'Api for retrieving data on shows, tracks and schedule for Radio Boise.',
      handler: apiLambda,
      defaultCorsPreflightOptions: {
        allowOrigins: [
          "http://localhost:8100",
          `https://radioboise.philmerrell.com`
        ],
        allowMethods: [
          "GET",
          "POST",
          "OPTIONS",
          "PUT",
          "DELETE"
        ],
        allowCredentials: true,
      },
      endpointConfiguration: {
        types: [ EndpointType.EDGE ]
      },
      domainName: {
        domainName: apiDomainName,
        endpointType: EndpointType.EDGE,
        certificate: sslCert
      }
    });

    new route53.ARecord(this, 'CreateAliasRecord', {
      recordName: apiDomainName,
      zone: zone,
      target: route53.RecordTarget.fromAlias(new targets.ApiGateway(api))
    })

  }
}