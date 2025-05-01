import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Consumer, Message, Producer } from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client = new Client({
    serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
  });
  private readonly producers: Producer[] = [];
  private readonly consumers: Consumer[] = [];

  constructor(private readonly configService: ConfigService) {}

  async onModuleDestroy(): Promise<void> {
    for (const producer of this.producers) {
      await producer.close();
    }

    for (const consumer of this.consumers) {
      await consumer.close();
    }
  }

  async createProducer(topic: string): Promise<Producer> {
    const producer = await this.client.createProducer({ topic });

    const foundProducer = this.producers.find((p) => p.getTopic() === producer.getTopic());

    if (foundProducer) {
      return foundProducer;
    }

    this.producers.push(producer);

    return producer;
  }

  async createConsumer(topic: string, listener: (message: Message) => void): Promise<Consumer> {
    const consumer = await this.client.subscribe({ topic, subscription: 'jobber', listener });
    this.consumers.push(consumer);

    return consumer;
  }
}
