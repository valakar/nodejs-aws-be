import { Client } from 'pg';
import { config } from '../utility/config';
import { Logger } from '../utility/logger';


export class DBService {
    private readonly dbOptions = {
        host: config.PG_HOST,
        port: config.PG_PORT,
        database: config.PG_DATABASE,
        user: config.PG_USERNAME,
        password: config.PG_PASSWORD,
        ssl: {
            rejectUnauthorized: false // to avoid warring in this example
        },
        connectionTimeoutMillis: config.CONNECTION_TIMEOUT,
    };

    async query(query: string) {
        const client = new Client(this.dbOptions);
        await client.connect();

        try {
            const response = await client.query(query)
            Logger.logResponse(response);
            return response?.rows;

        } catch (err) {
            throw err;

        } finally {
            client.end();
        }
    }
}

