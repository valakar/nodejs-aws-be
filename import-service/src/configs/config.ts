import { getEnv } from '../../../shared/env';

export const config = {
    BUCKET: getEnv('BUCKET') || 'bucket',
    SQS_URL: getEnv('SQS_URL'),
    SQS_ARN: getEnv('SQS_ARN'),
    REGION: getEnv('REGION') || 'eu-west-1',
    PRODUCT_SERVICE_STACK: getEnv('PRODUCT_SERVICE_STACK'),
}
