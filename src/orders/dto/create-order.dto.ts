import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString, IsNumber, IsString, ValidateIf,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '45', description: "customer's identifier" })
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: '68', description: "manger's identifier" })
  @IsNumber()
  readonly manager_id: number;

  @ApiProperty({ example: '4', description: "promocode's identifier" })
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  readonly promocode_id!: number | null;

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

  @ApiProperty({ example: '23', description: "address's identifier" })
  @IsNumber()
  readonly address_id: number;

  @ApiProperty({ example: 'new meal from spain', description: "kitchens's comment" })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly kitchen_comment!: string | null;

  @ApiProperty({ example: 'new address without roads', description: "delivery's comment" })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly delivery_comment!: string | null;

  @ApiProperty({ example: '2021-11-11T10:00:00:000Z', description: 'start date' })
  @IsDateString()
  readonly start_date: Date;

  @ApiProperty({
    example: '5',
    description: 'how long will proceed orders. start date + 5 days'
  })
  @IsNumber()
  readonly length: number;

  @ApiProperty({
    example: '2',
    description: 'meals per day, f.i. 2 means in the morning and in the evening'
  })
  @IsNumber()
  readonly meals_per_day: number;

  @ApiProperty({
    example: '3',
    description: 'week size, f.i. 3 means 3 days continuously, days starts from monday'
  })
  @IsNumber()
  readonly week_size: number;

  @ApiProperty({ example: '500', description: '500 czech koruna' })
  @IsNumber()
  readonly original_price: number;

  @ApiProperty({ example: '2,11,98', description: 'ignored meals identifiers' })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly ignored_meals!: string | null;

  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'delivery time' })
  @IsDateString()
  @ValidateIf((object, value) => value !== null)
  readonly delivery_time!: Date | null;

  @ApiProperty({ example: 1, description: 'new' })
  @IsNumber()
  readonly status: number;

  @ApiProperty({ example: 1, description: 'web' })
  @IsNumber()
  readonly source: number;
}