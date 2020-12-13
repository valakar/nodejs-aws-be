import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(private httpService: HttpService) {}

    redirectRequest(url, method, body, headers): Promise<any> {
        const axiosConfig = {
            method,
            url,
            ...(
                Object.keys(body || {}).length > 0 && { data: body }
            ),
            headers: {
                ...headers,
                'Access-Control-Allow-Origin': '*'
            }
        };

        console.log('axiosConfig', axiosConfig);
        return this.httpService.request(axiosConfig).toPromise()
    }
}
