export const _500 = (error: Error): any => ({
    statusCode: 500,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
        name: error?.name,
        message: error?.message,
        error
    }),
});
