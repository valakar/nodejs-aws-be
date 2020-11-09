import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';

export namespace Logger {
    export const logEvent = (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): void => {
        console.log(`Body: ${JSON.stringify(event?.body)}`);
        console.log(`QueryParams: ${JSON.stringify(event?.queryStringParameters)}`);
        console.log(`PathParams: ${JSON.stringify(event?.pathParameters)}`);
    }

    export const logResponse = (response: any): void => {
        console.log(`Response: ${JSON.stringify(response)}`);
    }
}
