import { PulsarClient } from '@job-executor-v2/pulsar';

import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';

@Job({ name: 'Fibonacci', description: 'Generate a Fibonacci sequence and store it in the DB' })
export class FibonacciJob extends AbstractJob {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
