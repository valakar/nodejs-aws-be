import {
    APIGatewayEventDefaultAuthorizerContext,
    APIGatewayProxyEventBase,
    APIGatewayProxyHandler,
} from 'aws-lambda';
import { createProduct } from './create-product';
import { Product } from '../../../../nodejs-aws-fe/src/models/Product';
import { expect } from '@jest/globals';

jest.mock('../services/product.service');
jest.mock('../../../shared/utility/logger');

describe('create product', () => {
    let sut: APIGatewayProxyHandler;
    let event: Partial<APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>>;
    let response;

    const validProduct: Product = {
        title: 'title',
        price: 1,
        count: 2,
        image: 'image',
        description: 'description',
        tier: 'tier',
        score: 3,
    };
    const invalidProduct: any = {
        title: 123,
        price: 1,
        count: 2,
        image: 'image',
        description: 'description',
        tier: 'tier',
        score: 3,
    };

    beforeEach(() => {
        sut = createProduct;
    });

    describe('success', () => {
        beforeEach(async () => {
            event = {
                body: JSON.stringify(validProduct),
            };
            response = await sut(<any>event, null, null);
        });

        test('should create product', () => {
            expect(response).toEqual({
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: '{}',
            });
        });
    });



    describe('fail', () => {
        describe('when invalid data', () => {
            beforeEach(async () => {
                event = {
                    body: JSON.stringify(invalidProduct),
                };
                response = await sut(<any>event, null, null);
            });
            test('should response with 400 - invalid product', () => {
                expect(response).toEqual({
                    statusCode: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    body: JSON.stringify('Invalid data provided: ValidationError: "title" must be a string'),
                });
            });
        });

        describe('when bad payload', () => {
            beforeEach(async () => {
                event = {
                    body: null,
                };
                response = await sut(<any>event, null, null);
            });
            test('should response with 400 - no product provided', () => {
                expect(response).toEqual({
                    statusCode: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    body: JSON.stringify('No product provided'),
                });
            });
        });
    });
});
