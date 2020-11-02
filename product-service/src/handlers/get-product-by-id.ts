import { APIGatewayProxyHandler } from 'aws-lambda';
import productList from '../mock/product-list.json';
import { _200, _400, _404 } from '../responses';

export const getProductById: APIGatewayProxyHandler = async (event) => {
    const id = event?.pathParameters?.id;

    if (!id) {
        return _400('Id was not provided');
    }

    const product = productList.find(product => product.id === id);
    const asyncProduct = await getAsyncProduct(product);

    return asyncProduct
        ? _200(asyncProduct)
        : _404('Product not found');
}

const getAsyncProduct = async (product) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(product), 1000)
    });
}
