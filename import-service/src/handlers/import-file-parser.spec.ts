import { importFileParser } from './import-file-parser';
import { S3Service } from '../services/s3.service';

jest.mock('../services/s3.service');
jest.mock('../../../shared/utility/logger');

describe('import file parser', () => {
    let sut: any;
    let event: any;
    let response;

    beforeEach(() => {
        sut = importFileParser;
    });

    describe('parse file', () => {
        beforeEach(async () => {

            S3Service.prototype.parseFile = jest.fn().mockImplementationOnce(records => {
                return records && 'success';
            });
            event = {
                Records: []
            };
            response = await sut(<any>event, null, null);
        });

        test('should parse file', () => {
            expect(response).toBe('success');
        });
    });
});
