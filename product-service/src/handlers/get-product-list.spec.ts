import { expect, test } from '@jest/globals';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getProductList } from './get-product-list';
import productList from '../mock/product-list.json';

describe('get product list', () => {
    let sut: APIGatewayProxyHandler;

    beforeEach(() => {
        sut = getProductList;
    });

    test('should response with 200 and product list', async () => {
        const response = await sut(null, null, null)
        expect(response).toEqual({
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(productList),
        });
    });
})


