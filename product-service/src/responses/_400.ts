export const _400 = (data = 'Bad Request') => ({
    statusCode: 400,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data),
});
