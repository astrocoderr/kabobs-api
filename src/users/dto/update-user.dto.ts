import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'first name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Mathew', description: 'last name' })
  readonly lastName: string;

  @ApiProperty({ example: '2021-11-11T10:00:00:000Z', description: 'birthday' })
  readonly birthday: Date;

  @ApiProperty({ example: 'john@mathew.com', description: 'email address' })
  readonly email: string;

  @ApiProperty({ example: '1', description: 'role' })
  readonly role: number;

  @ApiProperty({ example: '5', description: 'privilege identifier' })
  readonly privilegeID: number;

  @ApiProperty({ example: '12345678', description: 'password' })
  readonly password: string;

  @ApiProperty({ example: '38', description: "delaware's branch identifier" })
  readonly branchID: number;

  @ApiProperty({ example: '1826', description: "user's identifier in bitrix system" })
  readonly bitrixID: number;
}