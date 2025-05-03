import { Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Message } from 'pulsar-client';

import { PulsarClient } from './pulsar.client';
import { deserialize } from './serialize';

export abstract class PulsarConsumer<T> implements OnModuleInit {
  private consumer!: Consumer;
  protected readonly logger = new Logger(
    `PulsarConsumer on topic: ${this.topic}`
  );

  protected constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {}

  async onModuleInit() {
    console.log('Fibonacci consumer initialized');
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.listener.bind(this)
    );
  }

  protected async acknowledgeMessage(message: Message): Promise<void> {
    await this.consumer.acknowledge(message);
  }

  protected abstract onMessage(message: T): Promise<void>;

  private async listener(message: Message): Promise<void> {
    try {
      const data = deserialize<T>(message.getData());
      this.logger.debug(`Received message: ${JSON.stringify(data)}`);
      await this.onMessage(data);
    } catch (error) {
      this.logger.error(error);
    } finally {
      await this.acknowledgeMessage(message);
    }
  }
}
