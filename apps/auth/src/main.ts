/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';

import { init } from '@job-executor-v2/nestjs';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).getOrThrow('AUTH_PORT');

  await init(app, port);

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/auth.proto'),
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
