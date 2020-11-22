import * as sinon from 'sinon';
import { SNSService } from './sns.service';
import AWS from 'aws-sdk';

const result = 'result';

class MockSNS {
    publish({Subject, Message}) {
        return {
            promise: () => {
                if (Subject === 'mySubject' && Message === 'myMessage') {
                    return result;
                } else {
                    return null;
                }
            },
        };
    }
}

describe('SNS service', () => {
    let sut: SNSService;

    beforeEach(() => {
        sinon.stub(AWS, 'SNS').returns(new MockSNS());
        sut = new SNSService();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('send email', () => {
        test('should publish message', async () => {
            const response = await sut.sendEmail('mySubject', 'myMessage');
            expect(response).toEqual(result);
        });
    });
});
