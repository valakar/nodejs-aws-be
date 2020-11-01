import { APIGatewayProxyHandler } from 'aws-lambda';
import productList from '../mock/product-list.json';

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
    const id = event?.pathParameters?.id;
    console.log('id', id);
    const product = id && productList.find(product => product.id === id);
    console.log('product', product);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(product),
    };
}