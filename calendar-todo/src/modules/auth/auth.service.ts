import { Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { UsersService } from '../users/users.service';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { AuthExceptions } from './auth.exceptions';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
  ) {}

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private async validateUser(email: string, password: string) {
    const normalizedEmail = this.normalizeEmail(email);

    const user = await this.usersService.findByEmail(normalizedEmail);

    if (!user) throw AuthExceptions.invalidCredentials();

    const passwordMatches = await this.passwordService.compare(
      password,
      user.password,
    );

    if (!passwordMatches) throw AuthExceptions.invalidCredentials();
  }

  async signIn(dto: SignInUserDto) {
    const { email, password } = dto;

    await this.validateUser(email, password);
  }
}
