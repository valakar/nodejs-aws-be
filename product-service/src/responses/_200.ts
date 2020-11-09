import { APIGatewayProxyResult } from 'aws-lambda';

export const _200 = (data = {}): APIGatewayProxyResult => ({
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data),
});
