import { Consumer, Message } from 'pulsar-client';

import { PulsarClient } from './pulsar.client';

export abstract class PulsarConsumer {
  private consumer!: Consumer;

  protected constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {}

  async onModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(this.topic, this.onMessage.bind(this));
  }

  protected async acknowledgeMessage(message: Message): Promise<void> {
    await this.consumer.acknowledge(message);
  }

  protected abstract onMessage(message: Message): void;
}
