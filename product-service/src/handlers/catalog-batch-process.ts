import { SQSHandler } from 'aws-lambda';
import { Logger } from '../../../shared/utility/logger';

export const catalogBatchProcess: SQSHandler = async (event): Promise<void> => {
    Logger.logEvent(event);
    // const productService = new ProductService();
    // let product: Product;

    // try {
    //     if (!event?.body) {
    //         return _400('No product provided');
    //     }
    //     const body = JSON.parse(event.body);
    //     product = {
    //         title: body.title,
    //         price: body.price,
    //         count: body.count,
    //         image: body.image,
    //         description: body.description,
    //         tier: body.tier,
    //         score: body.score,
    //     };
    //
    //     await ProductValidator.validateProductCreation(product);
    // } catch (err) {
    //     return _400(`Invalid data provided: ${err}`);
    // }

    try {
        // await productService.createProduct(product);
        // return _200();
    } catch (error) {
        // return _500(error);
    }
};
