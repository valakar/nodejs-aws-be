import { S3Event } from 'aws-lambda';
import { Logger } from '../../../shared/utility/logger';
import { S3Service } from '../services/s3.service';
import { _400 } from '../../../shared/responses';

export const importFileParser = async (event: S3Event, _context) => {
    Logger.logEvent(event);
    const s3Service = new S3Service();

    if (!event?.Records) {
        return _400('No Records');
    }

    return await s3Service.parseFile(event.Records);
};
