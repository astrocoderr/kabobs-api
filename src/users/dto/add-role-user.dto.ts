import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddRoleUserDto{
  @ApiProperty({ example: '23', description: "user's identifier" })
  @IsNumber()
  readonly userID: number;

  @ApiProperty({ example: '1', description: 'role for user' })
  @IsNumber()
  readonly roleID: number;
}