import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate, IsEmail, IsNumber, IsPhoneNumber, IsString, Matches,
  MaxLength, MinLength
} from 'class-validator';

export class UpdateCustomerDto {
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

  @ApiProperty({ example: '2021-11-11T10:00:00:000Z', description: 'birthday' })
  @IsDate()
  readonly birthday: Date;

  @ApiProperty({ example: 'john@mathew.com', description: 'email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1', description: 'male' })
  @IsNumber()
  readonly gender: number;

  @ApiProperty({ example: '+420277007550', description: 'phone number' })
  @IsPhoneNumber()
  readonly phone: string;

  @ApiProperty({ example: '+420277887555', description: 'additional phone number' })
  @IsPhoneNumber()
  readonly additional_phone: string;

  @ApiProperty({ example: '68', description: 'address identifier' })
  @IsNumber()
  readonly address_id: number;

  @ApiProperty({ example: '44', description: 'factor identifier' })
  @IsNumber()
  readonly factor_id: number;

  @ApiProperty({ example: '3307', description: "customer's identifier in bitrix system" })
  @IsNumber()
  readonly bitrix_id: number;

  @ApiProperty({ example: '37', description: "kitchens's identifier" })
  @IsNumber()
  readonly kitchen_id: number;

  @ApiProperty({ example: 'false', description: 'is customer is vip' })
  @IsBoolean()
  readonly is_vip: boolean;

  @ApiProperty({ example: 'cz', description: "customer's preferred system language" })
  @IsString()
  readonly language: string;

  @ApiProperty({ example: '1', description: 'manager identifier' })
  @IsNumber()
  readonly manager_id: number;

  @ApiProperty({ example: 'qwerty1234', description: 'password' })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' }
  )
  readonly password: string;

  @ApiProperty({ example: true, description: 'is 2 factor authentication switched on' })
  @IsBoolean()
  readonly two_fa: boolean;
}