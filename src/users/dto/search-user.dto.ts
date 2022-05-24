import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class SearchUserDto {
  @ApiProperty({ example: 'test', description: 'string parameter that goes on searching' })
  @IsString()
  readonly search: string;

  @ApiProperty({ example: 'asc', description: 'ascending' })
  @IsString()
  readonly sort: string;
}