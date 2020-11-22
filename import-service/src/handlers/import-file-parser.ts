import { S3Event } from 'aws-lambda';
import { Logger } from '../../../shared/utility/logger';
import { S3Service } from '../services/s3.service';
import { _400 } from '../../../shared/responses';
import { SQSService } from '../services/sqs.service';

export const importFileParser = async (event: S3Event, _context) => {
    Logger.logEvent(event);
    const s3Service = new S3Service();
    const sqsService = new SQSService();

    if (!event?.Records) {
        return _400('No Records');
    }

    return await s3Service.parseFile(
        event.Records,
        (body: any) => {
            if (typeof body !== 'string') {
                body = JSON.stringify(body);
            }

            return sqsService.addToQueue(body)
        }
    );
};
