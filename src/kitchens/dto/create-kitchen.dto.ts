import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsNumber, IsString, MaxLength,
  MinLength
} from 'class-validator';

export class CreateKitchenDto {
  @ApiProperty({ example: 'Jack&jones', description: 'name' })
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  name: string;

  @ApiProperty({ example: 'jackandjones@gmail.com', description: 'email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '68', description: 'address identifier' })
  @IsNumber()
  address: number;
}