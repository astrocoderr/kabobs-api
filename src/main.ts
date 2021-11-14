import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocsConfig } from '../swagger-docs/swagger-docs.config';

import { PORT } from '../config';
import * as fs from "fs";


async function start() {
  const app = await NestFactory.create(AppModule, {   });

  DocsConfig(app)

  await app.listen(PORT, () => {
    console.log(`User-service started on port ${PORT}`)
  });
}

start();
