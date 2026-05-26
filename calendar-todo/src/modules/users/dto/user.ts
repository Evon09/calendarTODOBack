import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class userDto {
  @IsString()
  @ApiProperty()
  id!: string;
  @ApiProperty()
  @IsString()
  email!: string;
  @ApiProperty()
  @IsString()
  name!: string;
  @ApiProperty()
  @IsString()
  password!: string;
  @ApiProperty()
  @IsDate()
  createdAt!: Date;
  @ApiProperty()
  @IsDate()
  updatedAt!: Date;
}
