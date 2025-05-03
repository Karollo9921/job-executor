import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Producer } from 'pulsar-client';

import { PulsarClient, serialize } from '@job-executor-v2/pulsar';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  protected constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, jobName: string): Promise<void> {
    await this.validateData(data);

    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(jobName);
    }

    await this.producer.send({ data: serialize<T>(data) });
  }

  private async validateData(data: T): Promise<boolean> {
    const errors = await validate(plainToInstance(this.messageClass, data));

    if (errors.length > 0) {
      throw new BadRequestException(`Job's data is invalid: ${JSON.stringify(errors)}`);
    }

    return true;
  }
}
