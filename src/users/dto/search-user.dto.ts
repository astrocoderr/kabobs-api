import { ApiProperty } from '@nestjs/swagger';
import {
  IsString
} from 'class-validator';

export class SearchUserDto {
  @ApiProperty({ example: "'45'", description: 'parameter that goes on searching' })
  @IsString()
  readonly search_str: string;

  @ApiProperty({ example: '45', description: 'parameter that goes on searching' })
  @IsString()
  readonly search_num: string;
}