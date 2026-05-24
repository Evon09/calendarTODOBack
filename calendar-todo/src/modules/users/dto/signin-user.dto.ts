import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password!: string;
}
