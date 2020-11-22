import { SQSEvent, SQSHandler } from 'aws-lambda';
import { Product } from '../../../../nodejs-aws-fe/src/models/Product';
import { expect } from '@jest/globals';
import { catalogBatchProcess } from './catalog-batch-process';
import { SNSService } from '../services/sns.service';
import { ProductValidator } from '../validators/product.validator';
import * as sinon from 'sinon';

jest.mock('../services/product.service');
jest.mock('../services/sns.service');
jest.mock('../../../shared/utility/logger');

describe('catalog batch process', () => {
    let sut: SQSHandler;
    let event: SQSEvent;

    const products: Product[] = [
        {
            title: 'validTitle',
            price: 1,
            count: 2,
            image: 'image',
            description: 'description',
            tier: 'tier',
        }, <any>{
            title: 'invalidTitle',
            price: 1,
            description: 'description',
            tier: 'tier',
            score: 3,
        },
    ];

    beforeEach(() => {
        SNSService.prototype.sendEmail = jest.fn();

        sinon.stub(ProductValidator, 'validateProductCreation').callsFake((product: Product) => {
            return product.title === 'validTitle'
                ? product
                : null;
        });
    });

    beforeEach(() => {
        sut = catalogBatchProcess;
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('success', () => {
        beforeEach(async () => {
            event = {
                Records: <any>products.map(product => (
                    { body: JSON.stringify(product) }
                )),
            };
            await sut(<any>event, null, null);
        });

        test('should create product', () => {
            expect(SNSService.prototype.sendEmail).toHaveBeenCalledWith(
                'Import products reply',
                '0: validTitle with count = 2',
            );
        });
    });
});
