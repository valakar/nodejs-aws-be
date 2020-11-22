import 'source-map-support/register';
import { getProductList } from './src/handlers/get-product-list';
import { getProductById } from './src/handlers/get-product-by-id';
import { createProduct } from './src/handlers/create-product';
import { catalogBatchProcess } from './src/handlers/catalog-batch-process';

export {
  getProductList,
  getProductById,
  createProduct,
  catalogBatchProcess
};

