import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John', description: 'first name' })
  firstName: string;

  @ApiProperty({ example: 'Mathew', description: 'last name' })
  lastName: string;

  @ApiProperty({ example: '2021-11-11T10:00:00:000Z', description: 'birthday' })
  birthday: Date;

  @ApiProperty({ example: 'john@mathew.com', description: 'email address' })
  email: string;

  @ApiProperty({ example: '1', description: 'male' })
  gender: number;

  @ApiProperty({ example: '+420277007550', description: 'phone number' })
  phone: string;

  @ApiProperty({ example: '+420277887555', description: 'additional phone number' })
  additionalPhone: string;

  @ApiProperty({ example: '68', description: 'address identifier' })
  address: number;

  @ApiProperty({ example: '44', description: 'factor identifier' })
  factorID: number;

  @ApiProperty({ example: '3307', description: "customer's identifier in bitrix system" })
  bitrixID: number;

  @ApiProperty({ example: '37', description: "kitchen's identifier" })
  kitchenID: number;

  @ApiProperty({ example: 'false', description: 'is customer is vip' })
  isVIP: boolean;

  @ApiProperty({ example: 'cz', description: "customer's preferred system language" })
  language: string;

  @ApiProperty({ example: '1', description: 'manager identifier' })
  managerID: number;

  @ApiProperty({ example: 'qwerty1234', description: 'password' })
  password: string;
}