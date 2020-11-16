import { APIGatewayProxyHandler } from 'aws-lambda';
import { _200, _400, _404, _500 } from '../../../shared/responses';
import { ProductService } from '../services/product.service';
import { Logger } from '../utility/logger';

export const getProductById: APIGatewayProxyHandler = async (event) => {
    Logger.logEvent(event);

    const productService = new ProductService();
    const id = event?.pathParameters?.id;

    if (!id) {
        return _400('Id was not provided');
    }

    try {
        const product = await productService.getProductById(id);
        return product
            ? _200(product)
            : _404('Product not found');
    } catch (error) {
        return _500(error)
    }
}
