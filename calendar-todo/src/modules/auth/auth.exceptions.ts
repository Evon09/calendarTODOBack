import { UnauthorizedException } from '@nestjs/common';

export class AuthExceptions {
  static invalidCredentials() {
    return new UnauthorizedException('Invalid email or password');
  }
}
