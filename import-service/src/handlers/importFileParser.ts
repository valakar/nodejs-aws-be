import { Logger } from '../../../shared/utility/logger';
import * as S3 from 'aws-sdk/clients/s3';
import * as csv from 'csv-parser';
import { config } from '../configs/config';

// TODO add proper type for event and response
export const importFileParser = async (event: any , _context) => {
    Logger.logEvent(event);

    const s3 = new S3({ region: 'eu-west-1' });
    const complete = () => {};
    const onComplete = new Promise(complete);

    event.Records.forEach(record => {
        console.log(`Record: ${record}`);
        const bucket = config.BUCKET;
        const recordKey = record.s3.object.key;

        const s3Stream = s3.getObject({
            Bucket: bucket,
            Key:  recordKey
        }).createReadStream();

        s3Stream.pipe(csv())
            .on('data', data => {
                console.log(`Data: ${JSON.stringify(data)}`);
            })
            .on('error', error => {
                console.log(`Error: ${error}`);
            })
            .on('end', async () => {
                console.log(`Copy from ${bucket}/${recordKey}`);

                await s3.copyObject({
                    Bucket: bucket,
                    CopySource: `${bucket}/${recordKey}`,
                    Key: recordKey.replace('uploaded', 'parsed')
                }).promise();

                await s3.deleteObject({
                    Bucket: bucket,
                    Key: recordKey
                }).promise();

                complete();
            });
    });

    return await onComplete;
}
