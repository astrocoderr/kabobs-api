import { ApiProperty } from '@nestjs/swagger';
import {
  IsString
} from 'class-validator';

export class SearchCustomerDto {
  @ApiProperty({ example: "'45'", description: 'parameter that goes on searching' })
  @IsString()
  search: string;
}