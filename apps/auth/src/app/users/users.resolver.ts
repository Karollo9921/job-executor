import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findUsers(): Promise<User[]> {
    return this.usersService.findUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') payload: CreateUserInput): Promise<User> {
    return this.usersService.createUser(payload);
  }
}
