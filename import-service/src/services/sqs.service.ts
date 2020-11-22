import { SQS } from 'aws-sdk';
import { config } from '../configs/config';

export class SQSService {
    private readonly sqs = new SQS();
    private readonly queueUrl = config.SQS_URL;

    addToQueue(body: string): void {
        this.sqs.sendMessage({
            QueueUrl: this.queueUrl,
            MessageBody: body
        }, (error, data) => {
            console.log(`Send product -> Data: ${JSON.stringify(data)}`);
            console.log(`Send product -> Error: ${JSON.stringify(error)}`);
        })
    }
}
