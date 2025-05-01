/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { init } from '@job-executor-v2/nestjs';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).getOrThrow('EXECUTOR_PORT');

  await init(app, port);
}

bootstrap();
