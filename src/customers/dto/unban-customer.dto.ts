import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UnbanCustomerDto{
  @ApiProperty({ example: '23', description: "customer's identifier" })
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: 'paid commissions', description: 'customer paid commissions' })
  @IsString()
  readonly unban_reason: string;
}