import { APIGatewayProxyHandler } from 'aws-lambda';
import * as S3 from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk/lib/error';
import { Logger } from '../../../shared/utility/logger';
import { _200, _500 } from '../../../shared/responses';

const BUCKET = 'vstore-app-upload-bucket';

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
    Logger.logEvent(event);

    const s3 = new S3({ region: 'eu-west-1' });
    const params: S3.Types.ListObjectsRequest = {
        Bucket: BUCKET,
        Prefix: 'thumbnails/',
    };

    try {
        const response: PromiseResult<S3.Types.ListObjectsV2Output, AWSError> =
            await s3.listObjectsV2(params).promise();

        Logger.logResponse(response);

        return _200(response?.Contents);
    } catch (error) {
        return _500(error);
    }
};

