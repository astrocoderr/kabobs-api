import { ApiProperty } from '@nestjs/swagger';
import {
  IsString
} from 'class-validator';

export class GetGroupIngredientsDto {
  @ApiProperty({ example: '10', description: 'offset' })
  @IsString()
  readonly page: number;

  @ApiProperty({ example: '5', description: 'limit' })
  @IsString()
  readonly limit: number;
}