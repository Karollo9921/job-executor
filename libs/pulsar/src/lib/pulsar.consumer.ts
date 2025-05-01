import { OnModuleInit } from '@nestjs/common';
import { Consumer, Message } from 'pulsar-client';

import { PulsarClient } from './pulsar.client';

export abstract class PulsarConsumer implements OnModuleInit {
  private consumer!: Consumer;

  protected constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {}

  async onModuleInit() {
    console.log('Fibonacci consumer initialized');
    this.consumer = await this.pulsarClient.createConsumer(this.topic, this.onMessage.bind(this));
  }

  protected async acknowledgeMessage(message: Message): Promise<void> {
    await this.consumer.acknowledge(message);
  }

  protected abstract onMessage(message: Message): void;
}
