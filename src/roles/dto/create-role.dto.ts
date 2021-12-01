import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto{
  @ApiProperty({ example: 'user', description: "customer's role" })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  @ApiProperty({ example: 'for customers', description: 'description for role' })
  @IsString()
  readonly description: string;
}