import { All, Controller, HttpException, HttpStatus, Req, Request, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @All('/*')
    async getHello(
        @Req() request: Request,
        @Res() response,
    ): Promise<void> {
        const { method, body, originalUrl } = <any>request;
        console.log('originalUrl', originalUrl);
        console.log('method', method);
        console.log('body', body);

        const [, recipient, ...url] = originalUrl.split('/');

        console.log('recipient', recipient);

        const recipientUrl = process.env[recipient];
        console.log(123, process.env);
        console.log('recipientUrl', recipientUrl);

        if (recipientUrl) {
            try {
                const { status, data } = await this.appService.redirectRequest(
                    `${recipientUrl}/${url.join('/')}`,
                    method,
                    body,
                );

                response.status(status).send(data);
            } catch (error) {
                const { response: errorResponse } = error;
                const { status, statusText } = errorResponse;

                throw new HttpException(statusText, status);
            }
        } else {
            throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY);
        }
    }
}
