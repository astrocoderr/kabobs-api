import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator';

export class UnbanUserDto{
  @ApiProperty({ example: '23', description: "user's identifier" })
  @IsNumber()
  readonly userID: number;

  @ApiProperty({ example: 'paid commissions', description: 'user paid commissions' })
  @IsString()
  readonly unbanReason: string;
}