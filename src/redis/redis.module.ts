import {
  CacheModule, Module, CACHE_MANAGER,
  OnModuleInit, Inject, Logger
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';

import { RedisService } from './services/redis.service';
import { cacheFactory } from './factories/cache.factory';


@Module({
  providers: [RedisService],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => cacheFactory(redisStore, configService),
      inject: [ConfigService]
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
