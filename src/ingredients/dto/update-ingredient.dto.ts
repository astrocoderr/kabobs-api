import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsNumber, IsString, MaxLength, MinLength
} from 'class-validator';


export class UpdateIngredientDto {
  @ApiProperty({ example: 'apple', description: 'ingredient name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({ example: '200', description: 'kcal' })
  @IsNumber()
  readonly kcal: number;

  @ApiProperty({ example: '100', description: 'protein' })
  @IsNumber()
  readonly prot: number;

  @ApiProperty({ example: '40', description: 'fat' })
  @IsNumber()
  readonly fat: number;

  @ApiProperty({ example: '68', description: 'carb' })
  @IsNumber()
  readonly carb: number;

  @ApiProperty({ example: '33', description: "group's identifier" })
  @IsNumber()
  readonly group_id: number;

  @ApiProperty({ example: 'unit', description: 'unit' })
  @IsString()
  readonly unit: string;

  @ApiProperty({ example: '500', description: 'brutto' })
  @IsNumber()
  readonly brutto: number;

  @ApiProperty({ example: '250', description: 'netto' })
  @IsNumber()
  readonly netto: number;

  @ApiProperty({ example: '5', description: 'percent' })
  @IsNumber()
  readonly percent: number;

  @ApiProperty({ example: 'apple, pineapple', description: 'tags; (apple, pineaplle)' })
  @IsString()
  readonly tags: string;

  @ApiProperty({ example: true, description: 'is orders is active' })
  @IsBoolean()
  readonly active: boolean;
}