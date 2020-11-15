import { Product } from '../../../../nodejs-aws-fe/src/models/Product';
import Joi from 'joi';

// TODO dig into HttpRequestValidator from serverless
export namespace ProductValidator {
    export const validateProductCreation = async (product: Product): Promise<any> => {
        const schema = Joi.object({
            title: Joi.string()
                .min(1)
                .max(256)
                .required(),
            price: Joi.number().required(),
            count: Joi.number().required(),
            image: Joi.string(),
            description: Joi.string(),
            tier: Joi.string(),
            score: Joi.number()
        });

        return await schema.validateAsync(product);
    }
}
