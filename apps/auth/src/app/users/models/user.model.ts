import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractModel } from '@job-executor-v2/nestjs';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;
}
