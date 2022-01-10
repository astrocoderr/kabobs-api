import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsNumber, IsString, MaxLength, MinLength
} from 'class-validator';


export class UpdateIngredientDto {
  @ApiProperty({ example: 'apple', description: 'ingredient name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: '200', description: 'kcal' })
  @IsNumber()
  kcal: number;

  @ApiProperty({ example: '100', description: 'protein' })
  @IsNumber()
  prot: number;

  @ApiProperty({ example: '40', description: 'fat' })
  @IsNumber()
  fat: number;

  @ApiProperty({ example: '68', description: 'carb' })
  @IsNumber()
  carb: number;

  @ApiProperty({ example: '33', description: "group's identifier" })
  @IsNumber()
  group: number;

  @ApiProperty({ example: 'unit', description: 'unit' })
  @IsString()
  unit: string;

  @ApiProperty({ example: '500', description: 'brutto' })
  @IsNumber()
  brutto: number;

  @ApiProperty({ example: '250', description: 'netto' })
  @IsNumber()
  netto: number;

  @ApiProperty({ example: '5', description: 'percent' })
  @IsNumber()
  percent: number;

  @ApiProperty({ example: 'apple, pineapple', description: 'tags; (apple, pineaplle)' })
  @IsString()
  tags: string;

  @ApiProperty({ example: true, description: 'is orders is active' })
  @IsBoolean()
  active: boolean;
}