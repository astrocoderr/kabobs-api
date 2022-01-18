import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString, IsEmail, IsNumber, IsString, Matches,
  MaxLength, MinLength, ValidateIf,
} from 'class-validator';

export class CreateUserDTO {
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
  @ValidateIf((object, value) => value !== null)
  readonly birthday!: Date | null;

  @ApiProperty({ example: 'john@mathew.com', description: 'email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1', description: 'role' })
  @IsNumber()
  readonly role_id: number;

  @ApiProperty({ example: '5', description: 'privilege identifier' })
  @IsNumber()
  readonly privilege_id: number;

  @ApiProperty({ example: '12345678', description: 'password' })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' }
  )
  readonly password: string;

  @ApiProperty({ example: '38', description: "delaware's branch identifier" })
  @IsNumber()
  readonly branch_id: number;

  @ApiProperty({ example: '1826', description: "user's identifier in bitrix system" })
  @IsNumber()
  readonly bitrix_id: number;
}