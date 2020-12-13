import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheStore {
    private readonly cacheable = {
        'product_api': {
            products: {
                GET: 120,
            },
        },
    };

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async get(recipient, url, method) {
        const cacheTtl = this.getCacheTtl(recipient, url, method);

        if (!!cacheTtl) {
            const cacheKey = this.getKey(recipient, url, method);

            return await this.cacheManager.get(cacheKey);
        }
    }

    async set(recipient, url, method, data) {
        const cacheTtl = this.getCacheTtl(recipient, url, method);

        if (!!cacheTtl) {
            const cacheKey = this.getKey(recipient, url, method);

            return await this.cacheManager.set(
                cacheKey,
                data,
                { ttl: cacheTtl },
            );
        }
    }

    private getCacheTtl(recipient, url, method) {
        return this.cacheable[recipient]
               && this.cacheable[recipient][url.join('/')]
               && this.cacheable[recipient][url.filter(Boolean).join('/')][method];
    }

    private getKey(recipient, url, method) {
        return `${recipient}|${url}|${method}`;
    }
}
