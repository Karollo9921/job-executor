import { Field, ObjectType } from '@nestjs/graphql';

import { IJobMetadata } from '../../interfaces/job-metadata.interface';

@ObjectType()
export class Job implements IJobMetadata {
  @Field()
  name: string;

  @Field()
  description: string;
}
