import { DBService } from './db.service';

export class ProductService {
    private readonly dbService: DBService;

    constructor() {
        this.dbService = new DBService();
    }

    async getProducts() {
        const query = `
select product.id, title, image, price, coalesce(stock.count, 0) as count
from product 
left join stock on product.id = stock.product_id 
`;
        return await this.dbService.query(query);
    }

    async getProductById(id: string) {
        const query = `
select product.id, title, image, price, description, tier, score, coalesce(stock.count, 0) as count
from product 
left join stock on product.id = stock.product_id 
where product.id = '${id}'
`;
        const products = await this.dbService.query(query);
        return products[0];
    }
}
