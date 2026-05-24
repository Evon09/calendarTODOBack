import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  registerUser(user: CreateUserDto): Promise<Partial<User> | null> {
    return this.prismaService.user.create({
      select: {
        id: true,
        email: true,
        name: true,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
