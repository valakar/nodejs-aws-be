interface APIGatewayProxyEvent {
    body: string | null;
    queryStringParameters: { [name: string]: string } | null;
    pathParameters: { [name: string]: string } | null;
}

export namespace Logger {
    export const logEvent = (event: APIGatewayProxyEvent): void => {
        console.log(`Event: ${JSON.stringify(event)}`);
        console.log(`Body: ${JSON.stringify(event?.body)}`);
        console.log(`QueryParams: ${JSON.stringify(event?.queryStringParameters)}`);
        console.log(`PathParams: ${JSON.stringify(event?.pathParameters)}`);
    }

    export const logResponse = (response: any): void => {
        console.log(`Response: ${JSON.stringify(response)}`);
    }
}
