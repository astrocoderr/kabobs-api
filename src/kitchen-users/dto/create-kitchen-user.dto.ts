import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsNumber, IsString, Matches, MaxLength,
  MinLength
} from 'class-validator';

export class CreateKitchenUserDto {
  @ApiProperty({ example: 'John', description: 'first name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly first_name: string;

  @ApiProperty({ example: 'Mathew', description: 'last name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly last_name: string;

  @ApiProperty({ example: 'jackandjones@gmail.com', description: 'email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty1234', description: 'password' })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' }
  )
  readonly password: string;

  @ApiProperty({ example: '68', description: 'kitchens identifier' })
  @IsNumber()
  readonly kitchen_id: number;
}