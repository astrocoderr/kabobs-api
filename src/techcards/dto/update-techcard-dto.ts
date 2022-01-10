import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';


export class UpdateTechcardDto {
  @ApiProperty({ example: 'type', description: 'type' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'title', description: 'title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'marketing title', description: 'marketing title' })
  @IsString()
  marketingTitle: string;

  @ApiProperty({ example: 'description', description: 'description' })
  @IsString()
  description: string;

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

  @ApiProperty({ example: '23', description: "ingredient's identifier" })
  @IsNumber()
  ingredient: number;

  @ApiProperty({ example: '20', description: 'amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '200', description: 'brutto' })
  @IsNumber()
  brutto: number;

  @ApiProperty({ example: '0', description: 'unit' })
  @IsNumber()
  unit: number;

  @ApiProperty({ example: '2', description: 'amount piece' })
  @IsNumber()
  amountPiece: number;

  @ApiProperty({ example: '3', description: 'percent' })
  @IsNumber()
  percent: number;

  @ApiProperty({ example: 'apple, pineapple', description: 'tags; (apple, pineapple)' })
  @IsString()
  tags: string;

  @ApiProperty({ example: '3', description: '3 small boxes' })
  @IsNumber()
  boxesSmall: number;

  @ApiProperty({ example: '2', description: '2 medium boxes' })
  @IsNumber()
  boxesMedium: number;

  @ApiProperty({ example: '1', description: '1 big box' })
  @IsNumber()
  boxesBig: number;

  @ApiProperty({ example: '2', description: 'ingredients amount' })
  @IsNumber()
  ingredientsAmount: number;
}