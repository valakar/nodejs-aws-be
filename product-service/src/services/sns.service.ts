import { config } from '../configs/config';
import { AWSError, SNS } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { PublishResponse } from 'aws-sdk/clients/sns';

export class SNSService {
    private readonly sns = new SNS({ region: config.REGION });
    private readonly topicArn = config.SNS_TOPIC_ARN;

    sendEmail(subject: string, body: string, options: {
        topTier
    }): Promise<PromiseResult<PublishResponse, AWSError>> {
        console.log('FilterPolicyAttributes: ', options);

        return this.sns.publish({
            Subject: subject,
            Message: body,
            TopicArn: this.topicArn,
            MessageAttributes: {
                topTier: {
                    DataType: 'String',
                    StringValue: String(options?.topTier),
                },
            },
        }).promise();
    }
}
