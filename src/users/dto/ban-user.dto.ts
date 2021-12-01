import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto{
  @ApiProperty({ example: '23', description: "user's identifier" })
  @IsNumber()
  readonly userID: number;

  @ApiProperty({ example: 'for spam', description: 'user did some spams' })
  @IsString()
  readonly banReason: string;
}