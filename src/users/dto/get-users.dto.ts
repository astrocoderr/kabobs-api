import { ApiProperty } from '@nestjs/swagger';
import {
  IsString
} from 'class-validator';

export class GetUsersDto {
  @ApiProperty({ example: '10', description: 'page' })
  @IsString()
  readonly page: number;

  @ApiProperty({ example: '5', description: 'limit' })
  @IsString()
  readonly limit: number;
}