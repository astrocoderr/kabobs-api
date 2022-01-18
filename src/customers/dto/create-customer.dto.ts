import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsDateString, IsEmail, IsNumber,
  IsPhoneNumber, IsString, Matches, MaxLength,
  MinLength, ValidateIf,
} from 'class-validator';

export class CreateCustomerDto {
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
  @IsDateString()
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
  @ValidateIf((object, value) => value !== null)
  readonly is_vip!: boolean | null;

  @ApiProperty({ example: 'cz', description: "customer's preferred system language" })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly language!: string | null;

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
}