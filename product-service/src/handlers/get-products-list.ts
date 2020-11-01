import { APIGatewayProxyHandler } from 'aws-lambda';
import productList from '../mock/product-list.json';

export const getProductList: APIGatewayProxyHandler = async (event, _context) => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(productList),
    };
}
