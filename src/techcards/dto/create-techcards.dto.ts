import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';


export class CreateTechcardsDto {
  @ApiProperty({ example: 'type', description: 'type' })
  @IsString()
  readonly type: string;

  @ApiProperty({ example: 'title', description: 'title' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'marketing title', description: 'marketing title' })
  @IsString()
  readonly marketing_title: string;

  @ApiProperty({ example: 'description', description: 'description' })
  @IsString()
  readonly description: string;

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

  @ApiProperty({ example: '23', description: "ingredient's identifier" })
  @IsNumber()
  readonly ingredient_id: number;

  @ApiProperty({ example: '20', description: 'amount' })
  @IsNumber()
  readonly amount: number;

  @ApiProperty({ example: '200', description: 'brutto' })
  @IsNumber()
  readonly brutto: number;

  @ApiProperty({ example: '0', description: 'unit' })
  @IsNumber()
  readonly unit: number;

  @ApiProperty({ example: '2', description: 'amount piece' })
  @IsNumber()
  readonly amount_piece: number;

  @ApiProperty({ example: '3', description: 'percent' })
  @IsNumber()
  readonly percent: number;

  @ApiProperty({ example: '20', description: 'unique identifier' })
  @IsNumber()
  readonly tag_id: number;

  @ApiProperty({ example: '3', description: '3 small boxes' })
  @IsNumber()
  readonly boxes_small: number;

  @ApiProperty({ example: '2', description: '2 medium boxes' })
  @IsNumber()
  readonly boxes_medium: number;

  @ApiProperty({ example: '1', description: '1 big box' })
  @IsNumber()
  readonly boxes_big: number;

  @ApiProperty({ example: '2', description: 'ingredients amount' })
  @IsNumber()
  readonly ingredients_amount: number;
}