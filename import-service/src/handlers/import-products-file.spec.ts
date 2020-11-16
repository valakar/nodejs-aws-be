import { S3Service } from '../services/s3.service';
import { importProductsFile } from './import-products-file';
import {
    APIGatewayEventDefaultAuthorizerContext,
    APIGatewayProxyEventBase,
    APIGatewayProxyHandler,
} from 'aws-lambda';
import { _200 } from '../../../shared/responses';

jest.mock('../services/s3.service');
jest.mock('../../../shared/utility/logger');

describe('import products file', () => {
    let sut: APIGatewayProxyHandler;
    let event: Partial<APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>>;
    let response;

    beforeEach(() => {
        sut = importProductsFile;
    });

    describe('signed url', () => {
        beforeEach(async () => {
            S3Service.prototype.getSignedUrl = jest.fn()
                .mockImplementationOnce((operation, catalogPath) => {
                    return operation == 'putObject' && catalogPath == 'uploaded/products.csv'
                        ? Promise.resolve('signedUrl')
                        : Promise.resolve(null);
                });
        });

        describe('when success', () => {
            beforeEach(async () => {
                event = {
                    queryStringParameters: {
                        name: 'products.csv',
                    },
                };
                response = await sut(<any>event, null, null);
            });

            test('should return 200 and signed url', () => {
                expect(response).toEqual(_200('signedUrl'));
            });
        });
    });
});
