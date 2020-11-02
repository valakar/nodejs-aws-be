import { expect, test } from '@jest/globals';
import {
    APIGatewayEventDefaultAuthorizerContext,
    APIGatewayProxyEventBase,
    APIGatewayProxyHandler,
} from 'aws-lambda';
import productList from '../mock/product-list.json';
import { getProductById } from './get-product-by-id';

describe('get product by id', () => {
    let sut: APIGatewayProxyHandler;
    let event: Partial<APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>>
    let response;

    beforeEach(() => {
        sut = getProductById;
    });

    describe('when product was found', () => {
        beforeEach(async () => {
            event = {
                pathParameters: {
                    id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'
                }
            }
            response = await sut(<any>event, null, null)
        });

        test('should response with 200', () => {
            expect(response).toEqual({
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(productList[0]),
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


