import { APIGatewayProxyHandler } from 'aws-lambda';
import { _200, _400, _500 } from '../../../shared/responses';
import { ProductService } from '../services/product.service';
import { Product } from '../../../../nodejs-aws-fe/src/models/Product';
import { ProductValidator } from '../validators/product.validator';
import { Logger } from '../../../shared/utility/logger';

export const createProduct: APIGatewayProxyHandler = async (event) => {
    Logger.logEvent(event);

    const productService = new ProductService();
    let product: Product;

    try {
        if (!event?.body) {
            return _400('No product provided');
        }

        const product = JSON.parse(event.body);
        await ProductValidator.validateProductCreation(product);
    } catch (err) {
        return _400(`Invalid data provided: ${err}`);
    }

    try {
        await productService.createProduct(product);
        return _200();
    } catch (error) {
        return _500(error);
    }
};
