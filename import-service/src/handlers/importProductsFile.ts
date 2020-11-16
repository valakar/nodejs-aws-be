import { APIGatewayProxyHandler } from 'aws-lambda';
import * as S3 from 'aws-sdk/clients/s3';
import { Logger } from '../../../shared/utility/logger';
import { _200, _500 } from '../../../shared/responses';
import { config } from '../configs/config';

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
    Logger.logEvent(event);

    const catalogPath = `uploaded/${(
        event.queryStringParameters.name
    )}`;

    const s3 = new S3({ region: 'eu-west-1' });
    const operation = 'putObject';
    const params = {
        Bucket: config.BUCKET,
        Key: catalogPath,
        Expires: 60,
        ContentType: 'text/csv'
    };

    try {
        const response: string = await s3.getSignedUrlPromise(operation, params);

        Logger.logResponse(response);

        return _200(response);
    } catch (error) {
        return _500(error);
    }
};

