import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsDateString, IsNumber, IsString
} from 'class-validator';


export class UpdateOrderDayDto {
  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'date time' })
  @IsDateString()
  readonly date: Date;

  @ApiProperty({ example: '25095', description: "order's identifier" })
  @IsNumber()
  readonly order_id: number;

  @ApiProperty({ example: '68', description: "customer's identifier" })
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: '55', description: "creator's identifier" })
  @IsNumber()
  readonly creator_id: number;

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

  @ApiProperty({ example: '200', description: 'czech koruna' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: '23', description: "address's identifier" })
  @IsNumber()
  readonly address_id: number;

  @ApiProperty({ example: 'new meal from spain', description: "kitchens's comment" })
  @IsString()
  readonly kitchen_comment: string;

  @ApiProperty({ example: 'new address without roads', description: "delivery's comment" })
  @IsString()
  readonly delivery_comment: string;

  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'delivery time' })
  @IsDateString()
  readonly delivery_time: Date;

  @ApiProperty({
    example: '2',
    description: 'meals per day, f.i. 2 means in the morning and in the evening'
  })
  @IsNumber()
  readonly meals_per_day: number;

  @ApiProperty({ example: '2,11,98', description: 'ignored meals identifiers' })
  @IsString()
  readonly ignored_meals: string;

  @ApiProperty({ example: true, description: 'is orders is active' })
  @IsBoolean()
  readonly active: boolean;

  // @ApiProperty({ example: 1, description: "kitchen's identifier" })
  // @IsNumber()
  // kitchenID: number;
}