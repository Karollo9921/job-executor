import { OnModuleDestroy } from '@nestjs/common';
import { Producer } from 'pulsar-client';

import { PulsarClient } from '@job-executor-v2/pulsar';

export abstract class AbstractJob implements OnModuleDestroy {
  private producer: Producer;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async onModuleDestroy(): Promise<void> {
    await this.producer.close();
  }

  async execute(data: object, jobName: string): Promise<void> {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(jobName);
    }

    await this.producer.send({ data: Buffer.from(JSON.stringify(data)) });
  }
}
