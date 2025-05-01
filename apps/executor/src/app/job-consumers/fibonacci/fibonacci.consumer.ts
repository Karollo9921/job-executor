import { Injectable } from '@nestjs/common';
import { Message } from 'pulsar-client';

import { PulsarClient, PulsarConsumer } from '@job-executor-v2/pulsar';

@Injectable()
export class FibonacciConsumer extends PulsarConsumer {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }

  protected async onMessage(message: Message): Promise<void> {
    console.log('Fibonacci consumer onMessage');
    await this.acknowledgeMessage(message);
  }
}
