import { Serverless } from 'serverless/aws';
require('dotenv').config();
import { config } from './src/configs/config';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'authorization-service',
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    // Add the serverless-webpack plugin
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
        },
    },
    functions: {
      basicAuthorizer: {
            handler: 'handler.basicAuthorizer',
        },
    },
};

module.exports = serverlessConfiguration;
