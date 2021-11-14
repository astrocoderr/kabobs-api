import { ApiProperty } from "@nestjs/swagger";

export class BanCustomerDto{
  @ApiProperty({ example: '23', description: "customer's identifier" })
  readonly customerID: number;
  @ApiProperty({ example: 'for spam', description: 'user did some spams' })
  readonly banReason: string;
}