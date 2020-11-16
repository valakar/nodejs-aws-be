import * as S3 from 'aws-sdk/clients/s3';
import { CopyObjectOutput, DeleteObjectOutput } from 'aws-sdk/clients/s3';
import * as csv from 'csv-parser';
import { config } from '../configs/config';
import { AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { Readable } from 'stream';

export class S3Service {
    private readonly s3 = new S3({ region: 'eu-west-1' });
    private readonly bucket = config.BUCKET;

    async getSignedUrl(operation, catalogPath): Promise<string> {
        const params = {
            Bucket: this.bucket,
            Key: catalogPath,
            Expires: 60,
            ContentType: 'text/csv',
        };

        return await this.s3.getSignedUrlPromise(operation, params);
    }

    // TODO add proper type for record
    async parseFile(records): Promise<any> {
        const complete = () => {};
        const onComplete = new Promise(complete);

        records.forEach(record => {
            console.log(`Record: ${record}`);
            const recordKey = record.s3.object.key;

            const s3Stream = this.getReadableStream(recordKey);

            s3Stream.pipe(csv())
                .on('data', data => this.onData(data))
                .on('error', error => this.onError(error))
                .on('end', async () => {
                    console.log(`Copy from ${this.bucket}/${recordKey}`);

                    await this.copyObject(recordKey);
                    await this.deleteObject(recordKey);

                    complete();
                });
        });

        return await onComplete;
    }

    private onData(data) {
        console.log(`Data: ${JSON.stringify(data)}`);
    }

    private onError(error) {
        console.log(`Error: ${error}`);
    }

    private getReadableStream(recordKey: string): Readable {
        return this.s3.getObject({
            Bucket: this.bucket,
            Key: recordKey,
        }).createReadStream();
    }

    private copyObject(recordKey: string): Promise<PromiseResult<CopyObjectOutput, AWSError>> {
        return this.s3.copyObject({
            Bucket: this.bucket,
            CopySource: `${this.bucket}/${recordKey}`,
            Key: recordKey.replace('uploaded', 'parsed'),
        }).promise();
    }

    private deleteObject(recordKey: string): Promise<PromiseResult<DeleteObjectOutput, AWSError>> {
        return this.s3.deleteObject({
            Bucket: this.bucket,
            Key: recordKey,
        }).promise();
    }
}
