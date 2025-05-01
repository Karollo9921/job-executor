import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/proto/auth';

import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: ITokenPayload }
  ): Promise<User> | Observable<User> | User {
    return this.usersService.findUser({ id: request.user.userId });
  }
}
