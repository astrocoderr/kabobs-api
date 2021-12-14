import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsDateString, IsNumber, IsString
} from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ example: '45', description: "customer's identifier" })
  @IsNumber()
  customerID: number;

  @ApiProperty({ example: '68', description: "manger's identifier" })
  @IsNumber()
  userID: number;

  @ApiProperty({ example: '55', description: "creator's identifier" })
  @IsNumber()
  creatorID: number;

  @ApiProperty({ example: '4', description: "promocode's identifier" })
  @IsNumber()
  promocodeID: number;

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

  @ApiProperty({ example: '2021-11-11T10:00:00:000Z', description: 'start date' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    example: '5',
    description: 'how long will proceed orders. start date + 5 days'
  })
  @IsNumber()
  length: number;

  @ApiProperty({
    example: '2',
    description: 'meals per day, f.i. 2 means in the morning and in the evening'
  })
  @IsNumber()
  mealsPerDay: number;

  @ApiProperty({
    example: '3',
    description: 'week size, f.i. 3 means 3 days continuously, days starts from monday'
  })
  @IsNumber()
  weekSize: number;

  @ApiProperty({ example: '500', description: '500 czech koruna' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: true, description: 'is orders is active' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ example: '2,11,98', description: 'ignored meals identifiers' })
  @IsString()
  ignoredMeals: string;

  @ApiProperty({ example: 'new meal from spain', description: "kitchens's comment" })
  @IsString()
  kitchenComment: string;

  @ApiProperty({ example: 'new address without roads', description: "delivery's comment" })
  @IsString()
  deliveryComment: string;

  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'delivery time' })
  @IsDateString()
  deliveryTime: Date;

  @ApiProperty({ example: 1, description: 'new' })
  @IsNumber()
  status: number;

  @ApiProperty({ example: 1, description: 'web' })
  @IsNumber()
  source: number;
}