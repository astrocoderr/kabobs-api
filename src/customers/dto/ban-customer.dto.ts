import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanCustomerDto{
  @ApiProperty({ example: '23', description: "customer's identifier" })
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: 'for spam', description: 'user did some spams' })
  @IsString()
  readonly ban_reason: string;
}