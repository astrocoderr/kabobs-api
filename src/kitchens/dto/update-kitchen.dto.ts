import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsNumber, IsString, MaxLength,
  MinLength
} from 'class-validator';

export class UpdateKitchenDto {
  @ApiProperty({ example: 'Jack&jones', description: 'name' })
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  readonly name: string;

  @ApiProperty({ example: 'jackandjones@gmail.com', description: 'email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '68', description: 'address identifier' })
  @IsNumber()
  readonly address_id: number;
}