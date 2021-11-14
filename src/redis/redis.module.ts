import {
  CacheModule, Module, CACHE_MANAGER,
  OnModuleInit, Inject, Logger
} from "@nestjs/common";
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';

import { RedisService } from './services/redis.service';

@Module({
  providers: [RedisService],
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT
        }
      }
    })
  ],
  exports: [
    RedisService,
    RedisCacheModule
  ]
})

export class RedisCacheModule implements OnModuleInit{
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public onModuleInit(): any {
    const logger = new Logger('Cache')
  }
}

export class RedisModule {}
