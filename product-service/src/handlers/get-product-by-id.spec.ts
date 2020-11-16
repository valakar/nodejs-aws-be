import { expect, test } from '@jest/globals';
import {
    APIGatewayEventDefaultAuthorizerContext,
    APIGatewayProxyEventBase,
    APIGatewayProxyHandler,
} from 'aws-lambda';
import { getProductById } from './get-product-by-id';
import { ProductService } from '../services/product.service';

jest.mock('../services/product.service');
jest.mock('../../../shared/utility/logger');

describe('get product by id', () => {
    let sut: APIGatewayProxyHandler;
    let event: Partial<APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>>;
    let response;
    const existingProductId = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';

    beforeEach(() => {
        ProductService.prototype.getProductById = jest.fn().mockImplementation(
            (id) => {
                switch (id) {
                    case existingProductId:
                        return Promise.resolve('success');
                    default:
                        return Promise.resolve(null);
                }
            },
        );
    });

    beforeEach(() => {
        sut = getProductById;
    });

    describe('when product was found', () => {
        beforeEach(async () => {
            event = {
                pathParameters: {
                    id: existingProductId,
                },
            };
            response = await sut(<any>event, null, null);
        });

        test('should response with 200', () => {
            expect(response).toEqual({
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify('success'),
            });
        });
    });

    describe('when product was not found', () => {
        beforeEach(async () => {
            event = {
                pathParameters: {
                    id: 'bad'
                }
            }
            response = await sut(<any>event, null, null)
        });

        test('should response with 404',  () => {
            expect(response).toEqual({
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify('Product not found'),
            });
        });
    });

    describe('when product id was not provided', () => {
        beforeEach(async () => {
            response = await sut(null, null, null)
        });

        test('should response with 400',  () => {
            expect(response).toEqual({
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify('Id was not provided'),
            });
        });
    });
});


