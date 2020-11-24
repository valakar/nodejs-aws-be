import { SQSHandler } from 'aws-lambda';
import { Logger } from '../../../shared/utility/logger';
import { ProductValidator } from '../validators/product.validator';
import { ProductService } from '../services/product.service';
import { SNSService } from '../services/sns.service';
import { Tiers } from '../models/product';

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

        isValid && processedProducts.push(product);
    }

    const message = processedProducts.map(({ title, count }, index) => {
        return `${index}: ${title} with count = ${count}`;
    }).join('\n');

    const topTier = processedProducts
        .map(product => product.tier)
        .find(tier => tier === Tiers.mighty);

    try {
        const data = await snsService.sendEmail('Import products reply', message, {
            topTier: topTier || 'notTop',
        });
        console.log(`Send email -> Data: ${JSON.stringify(data)}`);
    } catch (error) {
        console.log(`Send email -> Error: ${JSON.stringify(error)}`);
    }
};
