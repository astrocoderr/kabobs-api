export const cacheFactory = (redisStore, configService) => ({
  store: redisStore,
  host: configService.get('REDIS.HOST'),
  port: configService.get('REDIS.PORT')
})