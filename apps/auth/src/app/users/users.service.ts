import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/auth';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async createUser(payload: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: { ...payload, password: await hash(payload.password, 10) },
    });
  }
}
