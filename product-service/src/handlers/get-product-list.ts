import { APIGatewayProxyHandler } from 'aws-lambda';
import { _200, _404, _500 } from '../responses';
import { ProductService } from '../services/product.service';
import { Logger } from '../utility/logger';

export const getProductList: APIGatewayProxyHandler = async (event) => {
    Logger.logEvent(event);

    const productService = new ProductService();

    try {
        const products = await productService.getProducts();
        return products && products.length > 0
            ? _200(products)
            : _404('No products found');
    } catch (error) {
        return _500(error)
    }
}
