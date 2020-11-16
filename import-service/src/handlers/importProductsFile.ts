import { APIGatewayProxyHandler } from 'aws-lambda';
import { Logger } from '../../../shared/utility/logger';
import { _200, _500 } from '../../../shared/responses';
import { S3Service } from '../services/s3.service';

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
    Logger.logEvent(event);

    const s3Service = new S3Service();

    const operation = 'putObject';
    const catalogPath = `uploaded/${(
        event.queryStringParameters.name
    )}`;

    try {
        const response: string = await s3Service.getSignedUrl(operation, catalogPath);

        Logger.logResponse(response);

        return _200(response);
    } catch (error) {
        return _500(error);
    }
};

