import { APIGatewayProxyResult } from 'aws-lambda';

export const _404 = (data = 'Not Found'): APIGatewayProxyResult => ({
    statusCode: 404,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data),
});
