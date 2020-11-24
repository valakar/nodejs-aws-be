import { DBService } from './db.service';
import { Product } from '../models/product';

export class ProductService {
    private readonly dbService: DBService;

    constructor() {
        this.dbService = new DBService();
    }

    async getProducts(): Promise<Product[]> {
        const query = `
select product.id, title, image, price, coalesce(stock.count, 0) as count
from product 
left join stock on product.id = stock.product_id 
`;
        return await this.dbService.executeQuery(query);
    }

    async getProductById(id: string): Promise<Product> {
        const query = `
select product.id, title, image, price, description, tier, score, coalesce(stock.count, 0) as count
from product 
left join stock on product.id = stock.product_id 
where product.id = '${id}'
`;
        const products = await this.dbService.executeQuery(query);
        return products[0];
    }

    async createProduct(product: Product): Promise<any> {
        const createProduct = `
insert into product (title,description,tier,image,price,score) VALUES
 ($1, $2, $3, $4, $5, $6) 
returning id;
`;

        const createStock = `
insert into stock (product_id,count) VALUES
 ($1, ${product.count});
`;
        const products = await this.dbService.executeTransactionQuery([
                createProduct,
                createStock,
            ],
            [
                product.title,
                product.description,
                product.tier,
                product.image,
                product.price,
                product.score,
            ],
        );
        return products[0];
    }
}
