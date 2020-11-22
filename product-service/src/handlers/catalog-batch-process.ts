import { SQSHandler } from 'aws-lambda';
import { Logger } from '../../../shared/utility/logger';
import { ProductValidator } from '../validators/product.validator';
import { ProductService } from '../services/product.service';
import { SNSService } from '../services/sns.service';

export const catalogBatchProcess: SQSHandler = async (event): Promise<void> => {
    Logger.logEvent(event);
    const productService = new ProductService();
    const snsService = new SNSService();
    const processedProducts = [];

    const records = event?.Records;
    if (!records) {
        console.error('No Records');
        return;
    }

    console.log(`Processing ${records.length} products`);

    for (const record of records) {
        console.log(`Processing -> ${record.body}`);

        const product = JSON.parse(record.body);
        const isValid = await ProductValidator.validateProductCreation(product);

        isValid && await productService.createProduct(product);

        processedProducts.push(product);
    }

    const message = processedProducts.map(({title, count}, index) => {
        return `${index}: ${title} with count = ${count}`
    }).join('\n');

    await snsService.sendEmail('Import products reply', message);
};
