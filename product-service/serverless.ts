require('dotenv').config();
import { config } from './src/configs/config';
import { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'product-service',
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
        'serverless-aws-documentation',
        'serverless-dotenv-plugin',
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
            SNS_TOPIC_ARN: {
                Ref: 'SNSTopic'
            }
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 'sns:publish',
                Resource: {
                    Ref: 'SNSTopic'
                }
            }
        ],
    },
    resources: {
        Resources: {
            SQSQueue: {
                Type: 'AWS::SQS::Queue',
                Properties: {
                    QueueName: 'catalogItemsQueue',
                },
            },
            SNSTopic: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    TopicName: 'createProductTopic'
                }
            },
            SNSSubscription: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: config.EMAIL,
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic'
                    }
                }
            },
            SNSSubscriptionBackup: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: config.BACKUP_EMAIL,
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic'
                    },
                    FilterPolicy: {
                        "topTier": ["Mighty"]
                    }
                }
            }
        },
        Outputs: {
            SQSQueueUrl: {
                Value: {
                    Ref: 'SQSQueue'
                }
            },
            SQSQueueArn: {
                Value: {
                    'Fn::GetAtt': ['SQSQueue', 'Arn']
                }
            }
        }
    },
    functions: {
        getProductList: {
            handler: 'handler.getProductList',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'products',
                        cors: true,
                    },
                },
            ],
        },
        getProductById: {
            handler: 'handler.getProductById',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'products/{id}',
                        cors: true,
                    },
                },
            ],
        },
        createProduct: {
            handler: 'handler.createProduct',
            events: [
                {
                    http: {
                        method: 'post',
                        path: 'products',
                        cors: true,
                    },
                },
            ],
        },
        catalogBatchProcess: {
            handler: 'handler.catalogBatchProcess',
            events: [
                {
                    sqs: {
                        batchSize: 5,
                        arn: {
                            'Fn::GetAtt': ['SQSQueue', 'Arn'],
                        },
                    },
                },
            ],
        },
    },
};

module.exports = serverlessConfiguration;
