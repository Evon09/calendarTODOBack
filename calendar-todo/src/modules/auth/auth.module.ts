import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PasswordModule } from '../password/password.module';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, PasswordModule, TokenModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
