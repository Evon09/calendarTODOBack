import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createProfileDto: CreateProfileDto) {
    const { name, email, password } = createProfileDto;

    const profileExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (profileExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profile = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return profile;
  }

  async refresh(createProfileDto: CreateProfileDto) {
    return { message: 'refresh token logic here' };
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
