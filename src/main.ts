import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocsConfig } from '../swagger-docs/swagger-docs.config';
import { HttpExceptionFilter } from '../filters/http-exception.filter';


(async () => {
  const app = await NestFactory.create(AppModule, {   });
  // swagger init
  DocsConfig(app);

  // config adding
  const config = app.get(ConfigService)
  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));

  // filter init
  app.useGlobalFilters(new HttpExceptionFilter());

  // validation init
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,

      forbidNonWhitelisted: true,
      disableErrorMessages: config.get('ENVIRONMENT') === config.get('PROD_ENV')
    })
  );

  // CORS
  app.enableCors({ origin: [ `http://localhost:${config.get('PORT')}` ] });

  // server start
  await app.listen(config.get('PORT'), () => {
    Logger.log(`Listening at http://localhost:${config.get('PORT')}/${config.get('GLOBAL_PREFIX')}`)
    Logger.log(`Running in ${config.get('ENVIRONMENT')} mode`)
  });
})()