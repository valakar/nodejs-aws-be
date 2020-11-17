export namespace Logger {
    export const logEvent = (event): void => {
        console.log(`Event: ${JSON.stringify(event)}`);
        console.log(`Body: ${JSON.stringify(event?.body)}`);
        console.log(`QueryParams: ${JSON.stringify(event?.queryStringParameters)}`);
        console.log(`PathParams: ${JSON.stringify(event?.pathParameters)}`);
    }

    export const logResponse = (response: any): void => {
        console.log(`Response: ${JSON.stringify(response)}`);
    }
}
