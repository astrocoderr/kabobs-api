import { ApiProperty } from "@nestjs/swagger";

export class UnbanCustomerDto{
  @ApiProperty({ example: '23', description: "customer's identifier" })
  readonly customerID: number;
  @ApiProperty({ example: 'paid commissions', description: 'customer paid commissions' })
  readonly unbanReason: string;
}