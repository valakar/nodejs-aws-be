import { APIGatewayProxyResult } from 'aws-lambda';

export const _400 = (data = 'Bad Request'): APIGatewayProxyResult => ({
    statusCode: 400,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data),
});
