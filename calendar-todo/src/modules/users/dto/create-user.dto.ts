import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @IsString()
  @ApiProperty()
  password!: string;
}
