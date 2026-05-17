import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PasswordModule } from '../password/password.module';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [UsersModule, PasswordModule, TokenModule],
  providers: [AuthService],
})
export class AuthModule {}
