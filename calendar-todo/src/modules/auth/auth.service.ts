import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { UsersService } from '../users/users.service';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { AuthExceptions } from './auth.exceptions';
import { TokenService } from '../token/token.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../token/types/jwt-payload.type';
import { userDto } from '../users/dto/user';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<userDto> {
    const normalizedEmail = this.normalizeEmail(email);

    const user = await this.usersService.findByEmail(normalizedEmail);

    if (!user) throw AuthExceptions.invalidCredentials();

    const passwordMatches = await this.passwordService.compare(
      password,
      user.password,
    );

    if (!passwordMatches) throw AuthExceptions.invalidCredentials();

    return user;
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }

  async signIn(dto: SignInUserDto) {
    const { email, password } = dto;

    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.tokenService.generateToken(payload);
    const refresh_token = await this.tokenService.generateRefreshToken(payload);

    return { access_token: token, refresh_token };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );

      const token = await this.tokenService.generateToken({
        sub: payload.sub,
        email: payload.email,
      });

      const refresh_token = await this.tokenService.generateRefreshToken({
        sub: payload.sub,
      });

      return {
        access_token: token,
        refresh_token,
      };
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async userExist(email: string): Promise<boolean> {
    const normalizedEmail = this.normalizeEmail(email);

    const user = await this.usersService.findByEmail(normalizedEmail);

    return !!user;
  }

  async register(user: CreateUserDto) {
    const { name, email, password } = user;

    if (await this.userExist(email)) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      name,
      password: hashedPassword,
    };

    try {
      return await this.usersService.registerUser(userData);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'Penis') {
          throw new BadRequestException('Email already exists');
        }
      }

      throw error;
    }
  }
}
