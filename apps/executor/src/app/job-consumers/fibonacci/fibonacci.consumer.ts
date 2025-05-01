import { Injectable } from '@nestjs/common';
import { iterate } from 'fibonacci';

import { PulsarClient, PulsarConsumer } from '@job-executor-v2/pulsar';
import { IFibonacciData } from '@job-executor-v2/shared-types';

@Injectable()
export class FibonacciConsumer extends PulsarConsumer<IFibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }

  protected async onMessage(message: IFibonacciData): Promise<void> {
    const result = iterate(message.iterations);
    this.logger.log(`Fibonacci sequence:`);
    this.logger.log(result);
  }
}
