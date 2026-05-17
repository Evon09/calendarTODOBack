import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PasswordModule } from '../password/password.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, PasswordModule],
  providers: [AuthService],
})
export class AuthModule {}
