import { config } from '../configs/config';
import { AWSError, SNS } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { PublishResponse } from 'aws-sdk/clients/sns';

export class SNSService {
    private readonly sns = new SNS({ region: config.REGION });
    private readonly topicArn = config.SNS_TOPIC_ARN;

    sendEmail(subject: string, body: string): Promise<PromiseResult<PublishResponse, AWSError>> {
        const a = this.sns.publish({
            Subject: subject,
            Message: body,
            TopicArn: this.topicArn
        }, (error, data) => {
            console.log(`Send email -> Data: ${JSON.stringify(data)}`);
            console.log(`Send email -> Error: ${JSON.stringify(error)}`);
        });
        return a.promise();
    }
}
