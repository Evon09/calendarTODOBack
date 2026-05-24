import { Body, Controller, Post } from '@nestjs/common';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refresh_token);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
