import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto{
  @ApiProperty({ example: '23', description: "user's identifier" })
  readonly userID: number;
  @ApiProperty({ example: 'for spam', description: 'user did some spams' })
  readonly banReason: string;
}