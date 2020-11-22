import { getEnv } from '../../../shared/env';

export const config = {
    PG_HOST: getEnv('PG_HOST') ,
    PG_PORT: getEnv('PG_PORT'),
    PG_DATABASE: getEnv('PG_DATABASE'),
    PG_USERNAME: getEnv('PG_USERNAME'),
    PG_PASSWORD: getEnv('PG_PASSWORD'),
    CONNECTION_TIMEOUT: getEnv('CONNECTION_TIMEOUT') || 5000,
    REGION: getEnv('REGION') || 'eu-west-1',
    EMAIL: getEnv('EMAIL'),
    BACKUP_EMAIL: getEnv('BACKUP_EMAIL'),
    SNS_TOPIC_ARN: getEnv('SNS_TOPIC_ARN'),
}
