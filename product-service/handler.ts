import 'source-map-support/register';
import {getProductList} from './src/handlers/get-product-list';
import {getProductById} from './src/handlers/get-product-by-id';
import {postProduct} from './src/handlers/post-product';

export {
  getProductList,
  getProductById,
  postProduct
};

