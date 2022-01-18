import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddRoleUserDto{
  @ApiProperty({ example: '23', description: "user's identifier" })
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ example: '1', description: 'role for user' })
  @IsNumber()
  readonly role_id: number;
}