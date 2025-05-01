import { Producer } from 'pulsar-client';

import { PulsarClient } from '@job-executor-v2/pulsar';

export abstract class AbstractJob<T> {
  private producer: Producer;

  protected constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, jobName: string): Promise<void> {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(jobName);
    }

    await this.producer.send({ data: Buffer.from(JSON.stringify(data)) });
  }
}
