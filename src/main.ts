import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocsConfig } from '../swagger-docs/swagger-docs.config';


(async () => {
  const app = await NestFactory.create(AppModule, {   });
  // Swagger Init
  DocsConfig(app)

  const config = app.get(ConfigService)
  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'))
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: config.get('ENVIRONMENT') === config.get('PROD_ENV')
    })
  )
  await app.listen(config.get('PORT'), () => {
    Logger.log(`Listening at http://localhost:${config.get('PORT')}/${config.get('GLOBAL_PREFIX')}`)
    Logger.log(`Running in ${config.get('ENVIRONMENT')} mode`)
  });
})()