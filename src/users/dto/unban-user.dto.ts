import { ApiProperty } from "@nestjs/swagger";

export class UnbanUserDto{
  @ApiProperty({ example: '23', description: "user's identifier" })
  readonly userID: number;
  @ApiProperty({ example: 'paid commissions', description: 'user paid commissions' })
  readonly unbanReason: string;
}