import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber, IsString, MaxLength, MinLength
} from 'class-validator';

export class CreatePromocodeDto {
  @ApiProperty({ example: '1Ae78FlS@MPL3', description: 'code' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  code: string;

  @ApiProperty({ example: '1', description: 'percentage' })
  @IsNumber()
  type: number;

  @ApiProperty({ example: '500', description: 'price amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2', description: 'inactive' })
  @IsNumber()
  status: number;

  @ApiProperty({ example: '1', description: 'single usage' })
  @IsNumber()
  usage: number;
}