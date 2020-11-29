require('dotenv').config();
import { Serverless } from 'serverless/aws';
import { config } from './src/configs/config';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'import-service',
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: [
        'serverless-webpack',
        'serverless-dotenv-plugin'
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',
        region: config.REGION,
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            SQS_URL: `$\{${config.PRODUCT_SERVICE_STACK}.SQSQueueUrl}`,
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 's3:ListBucket',
                Resource: `arn:aws:s3:::${config.BUCKET}`,
            },
            {
                Effect: 'Allow',
                Action: 's3:*',
                Resource: `arn:aws:s3:::${config.BUCKET}/*`
            },
            {
                Effect: 'Allow',
                Action: 'sqs:*',
                Resource: `$\{${config.PRODUCT_SERVICE_STACK}.SQSQueueArn}`
            }
        ],
    },
    resources: {
        Resources: {
            ApiGatewayResponseUnauthorized: {
                Type: 'AWS::ApiGateway::GatewayResponse',
                Properties: {
                    ResponseParameters: {
                        'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Credentials': "'true'",
                        'gatewayresponse.header.Access-Control-Allow-Methods': "'GET,OPTIONS'",
                    },
                    ResponseType: 'UNAUTHORIZED',
                    RestApiId: {
                        Ref: 'ApiGatewayRestApi'
                    }
                }
            },
            ApiGatewayResponseAccessDenied: {
                Type: 'AWS::ApiGateway::GatewayResponse',
                Properties: {
                    ResponseParameters: {
                        'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Credentials': "'true'",
                        'gatewayresponse.header.Access-Control-Allow-Methods': "'GET,OPTIONS'",
                    },
                    ResponseType: 'ACCESS_DENIED',
                    RestApiId: {
                        Ref: 'ApiGatewayRestApi'
                    }
                }
            }
        }
    },
    functions: {
        importProductsFile: {
            handler: 'handler.importProductsFile',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'import',
                        request: {
                            parameters: {
                                querystrings: {
                                    name: true
                                }
                            }
                        },
                        cors: true,
                        authorizer: {
                            name: 'basicAuthorizer',
                            type: 'token',
                            arn: `$\{${config.AUTHORIZATION_SERVICE_STACK}.BasicAuthorizerLambdaFunctionQualifiedArn}`,
                            resultTtlInSeconds: 0,
                            identitySource: 'method.request.header.Authorization'
                        }
                    },
                },
            ],
        },
        importFileParser: {
            handler: 'handler.importFileParser',
            events: [
                {
                    s3: {
                        bucket: config.BUCKET,
                        event: 's3:ObjectCreated:*',
                        rules: [{prefix: 'uploaded/', suffix: ''}],
                        existing: true
                    }
                }
            ]
        }
    },
};

module.exports = serverlessConfiguration;
