import { S3Service } from './s3.service';
import * as sinon from "sinon";
import AWS from 'aws-sdk';

const signedUrl = 'signedUrl';
class MockAWS {
    async getSignedUrlPromise() {
        return 'signedUrl';
    }
}

describe('S3 service', () => {
    let sut: S3Service;

    beforeEach(() => {
        sinon.stub(AWS, 'S3').returns(new MockAWS());
        sut = new S3Service();
    });

    afterEach(() => {
        sinon.restore();
    })

    describe('get signed url', () => {
        test('should get signed url', async () => {
            const response = await sut.getSignedUrl('putObject', 'uploaded/products');
            expect(response).toEqual(signedUrl);
        });
    });
});
