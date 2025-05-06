import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '@job-executor-v2/graphql';

import { ExecuteJobInput } from './dto/execute-job.input';
import { JobsService } from './jobs.service';
import { Job } from './models/job.model';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Job])
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    console.log('get job-consumers');
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') payload: ExecuteJobInput) {
    return this.jobsService.executeJob(payload.name, payload.data);
  }
}
