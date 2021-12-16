import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsDateString, IsNumber, IsString
} from 'class-validator';


export class UpdateOrderDayDto {
  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'date time' })
  @IsDateString()
  date: Date;

  @ApiProperty({ example: '25095', description: "order's identifier" })
  @IsNumber()
  orderID: number;

  @ApiProperty({ example: '68', description: "customer's identifier" })
  @IsNumber()
  customerID: number;

  @ApiProperty({ example: '55', description: "creator's identifier" })
  @IsNumber()
  creatorID: number;

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

  @ApiProperty({ example: '200', description: 'czech koruna' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: '23', description: "address's identifier" })
  @IsNumber()
  addressID: number;

  @ApiProperty({ example: 'new meal from spain', description: "kitchens's comment" })
  @IsString()
  kitchenComment: string;

  @ApiProperty({ example: 'new address without roads', description: "delivery's comment" })
  @IsString()
  deliveryComment: string;

  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'delivery time' })
  @IsDateString()
  deliveryTime: Date;

  @ApiProperty({
    example: '2',
    description: 'meals per day, f.i. 2 means in the morning and in the evening'
  })
  @IsNumber()
  mealsPerDay: number;

  @ApiProperty({ example: '2,11,98', description: 'ignored meals identifiers' })
  @IsString()
  ignoredMeals: string;

  @ApiProperty({ example: true, description: 'is orders is active' })
  @IsBoolean()
  active: boolean;

  // @ApiProperty({ example: 1, description: "kitchen's identifier" })
  // @IsNumber()
  // kitchenID: number;
}