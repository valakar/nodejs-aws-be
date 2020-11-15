import { expect, test } from '@jest/globals';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getProductList } from './get-product-list';
import { ProductService } from '../services/product.service';
jest.mock('../services/product.service');
jest.mock('../utility/logger');

describe('get product list', () => {
    let sut: APIGatewayProxyHandler;
    const productList = ['product list'];

    beforeEach(() => {
        sut = getProductList;
    });

    test('should response with 200 and product list', async () => {
        ProductService.prototype.getProducts = jest.fn().mockReturnValue(Promise.resolve(productList));

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

    test('should response with 404 when products not found', async () => {
        ProductService.prototype.getProducts = jest.fn().mockReturnValue(Promise.resolve([]));

        const response = await sut(null, null, null)
        expect(response).toEqual({
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify('No products found'),
        });
    });
})


