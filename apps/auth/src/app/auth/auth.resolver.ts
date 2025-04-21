import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { GqlContext } from '@job-executor-v2/nestjs';

import { User } from '../users/models/user.model';
import { LoginInput } from './dto/login.input';

import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(@Args('loginInput') payload: LoginInput, @Context() ctx: GqlContext) {
    return this.authService.login(payload, ctx.res);
  }
}
