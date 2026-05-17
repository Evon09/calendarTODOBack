import { Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { UsersService } from '../users/users.service';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { AuthExceptions } from './auth.exceptions';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private tokenService: TokenService,
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

    return user;
  }

  async signIn(dto: SignInUserDto) {
    const { email, password } = dto;

    const user = await this.validateUser(email, password);

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60;

    const token = await this.tokenService.generateToken({
      sub: user.id,
      email: user.email,
      iat,
      exp,
    });

    return { access_token: token };
  }
}
