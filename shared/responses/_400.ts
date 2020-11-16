export const _400 = (data = 'Bad Request'): any => ({
    statusCode: 400,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data),
});
