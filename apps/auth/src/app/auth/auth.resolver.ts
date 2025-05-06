import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { IGqlContext } from '@job-executor-v2/graphql';

import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('loginInput') payload: LoginInput,
    @Context() ctx: IGqlContext
  ) {
    return this.authService.login(payload, ctx.res);
  }
}
