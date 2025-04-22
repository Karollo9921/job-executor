import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { currentUser } from '../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  async findUsers(@currentUser() { userId, userUuid }: ITokenPayload): Promise<User[]> {
    console.log(userId, userUuid);
    return this.usersService.findUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') payload: CreateUserInput): Promise<User> {
    return this.usersService.createUser(payload);
  }
}
