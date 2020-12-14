import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheStore } from './cache.store';

@Module({
  imports: [
      HttpModule,
      CacheModule.register()
  ],
  controllers: [AppController],
  providers: [AppService, CacheStore],
})
export class AppModule {}
