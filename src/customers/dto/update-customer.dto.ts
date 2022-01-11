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
  firstName: string;

  @ApiProperty({ example: 'Mathew', description: 'last name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: '2021-11-11T10:00:00:000Z', description: 'birthday' })
  @IsDate()
  birthday: Date;

  @ApiProperty({ example: 'john@mathew.com', description: 'email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1', description: 'male' })
  @IsNumber()
  gender: number;

  @ApiProperty({ example: '+420277007550', description: 'phone number' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: '+420277887555', description: 'additional phone number' })
  @IsPhoneNumber()
  additionalPhone: string;

  @ApiProperty({ example: '68', description: 'address identifier' })
  @IsNumber()
  address: number;

  @ApiProperty({ example: '44', description: 'factor identifier' })
  @IsNumber()
  factorID: number;

  @ApiProperty({ example: '3307', description: "customer's identifier in bitrix system" })
  @IsNumber()
  bitrixID: number;

  @ApiProperty({ example: '37', description: "kitchens's identifier" })
  @IsNumber()
  kitchenID: number;

  @ApiProperty({ example: 'false', description: 'is customer is vip' })
  @IsBoolean()
  isVIP: boolean;

  @ApiProperty({ example: 'cz', description: "customer's preferred system language" })
  @IsString()
  language: string;

  @ApiProperty({ example: '1', description: 'manager identifier' })
  @IsNumber()
  managerID: number;

  @ApiProperty({ example: 'qwerty1234', description: 'password' })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' }
  )
  password: string;

  @ApiProperty({ example: true, description: 'is 2 factor authentication switched on' })
  @IsBoolean()
  twoFA: boolean;
}