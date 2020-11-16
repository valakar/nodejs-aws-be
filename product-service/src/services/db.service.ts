import { Client, ClientConfig } from 'pg';
import { config } from '../configs/config';
import { Logger } from '../../../shared/utility/logger';

export class DBService {
    private readonly dbOptions: ClientConfig = {
        host: config.PG_HOST,
        port: +config.PG_PORT,
        database: config.PG_DATABASE,
        user: config.PG_USERNAME,
        password: config.PG_PASSWORD,
        ssl: {
            rejectUnauthorized: false // to avoid warring in this example
        },
        connectionTimeoutMillis: +config.CONNECTION_TIMEOUT,
    };

    async executeQuery(query: string) {
        const client = new Client(this.dbOptions);
        await client.connect();

        try {
            const response = await client.query(query)
            Logger.logResponse(response);
            return response?.rows;

        } catch (err) {
            throw err;

        } finally {
            await client.end();
        }
    }

    // TODO fix when more than one row passed
    async executeTransactionQuery(queries: string[], values: any[]) {
        const client = new Client(this.dbOptions);
        await client.connect();

        try {
            await client.query('BEGIN');

            const response = await queries.reduce(async (values, query) => {
                const passedArgs = await values;
                const {rows: queryResult} = await client.query(query, passedArgs);
                return queryResult.length > 0
                    ? Object.values(queryResult[0])
                    : queryResult;
            }, Promise.resolve(values))

            Logger.logResponse(response);

            await client.query('COMMIT')
            return response;
        } catch (err) {
            await client.query('ROLLBACK')

            throw err;
        } finally {
            await client.end();
        }
    }
}

