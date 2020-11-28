import { getEnv } from '../../../shared/env';

export const config = {
    REGION: getEnv('REGION') || 'eu-west-1',
    getCredByUser: (username) => getEnv(username)
}
