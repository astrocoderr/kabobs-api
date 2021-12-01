import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanCustomerDto{
  @ApiProperty({ example: '23', description: "customer's identifier" })
  @IsNumber()
  readonly customerID: number;

  @ApiProperty({ example: 'for spam', description: 'user did some spams' })
  @IsString()
  readonly banReason: string;
}