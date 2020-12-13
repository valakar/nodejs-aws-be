import { HttpService, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppService {
    constructor(private httpService: HttpService) {}

    redirectRequest(url, method, body): Promise<any> {
        const axiosConfig = {
            method,
            url,
            ...(
                Object.keys(body || {}).length > 0 && { data: body }
            ),
        };

        console.log('axiosConfig', axiosConfig);
        return this.httpService.request(axiosConfig).toPromise()
    }
}
