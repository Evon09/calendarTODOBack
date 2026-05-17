import { Body, Controller, Post } from '@nestjs/common';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto);
  }
}
