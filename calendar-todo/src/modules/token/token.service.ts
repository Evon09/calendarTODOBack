import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, RefreshTokenPayload } from './types/jwt-payload.type';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  generateRefreshToken(payload: RefreshTokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }
}
