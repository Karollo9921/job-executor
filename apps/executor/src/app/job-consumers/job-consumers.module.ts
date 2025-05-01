import { Module } from '@nestjs/common';

import { PulsarModule } from '@job-executor-v2/pulsar';

import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';

@Module({
  imports: [PulsarModule],
  providers: [FibonacciConsumer],
})
export class JobConsumersModule {}
