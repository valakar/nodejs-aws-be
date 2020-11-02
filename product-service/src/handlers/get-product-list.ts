import { APIGatewayProxyHandler } from 'aws-lambda';
import productList from '../mock/product-list.json';
import { _200, _404 } from '../responses';

export const getProductList: APIGatewayProxyHandler = async () => {
    return productList && productList.length > 0
        ? _200(productList)
        : _404('No products found');
}
