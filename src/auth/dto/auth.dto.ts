import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto{
  @ApiProperty({ example: 'john@john.com', description: 'email of user' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: 'password of user' })
  @IsString()
  readonly password: string;
}