import { DiscoveredClassWithMeta, DiscoveryService } from '@golevelup/nestjs-discovery';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';

import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { IJobMetadata } from '../interfaces/job-metadata.interface';
import { AbstractJob } from './abstract.job';
import { Job } from './models/job.model';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<IJobMetadata>[] = [];

  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit(): Promise<void> {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<IJobMetadata>(JOB_METADATA_KEY);
  }

  getJobs(): Job[] {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob(name: string): Promise<Job> {
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Job ${name} does not exists`);
    }

    await (job.discoveredClass.instance as AbstractJob).execute({}, job.meta.name);

    return job.meta;
  }
}
