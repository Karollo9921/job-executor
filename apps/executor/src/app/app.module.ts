import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { JobConsumersModule } from './job-consumers/job-consumers.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JobConsumersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
