import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto{
  @ApiProperty({ example: '23', description: "user's identifier" })
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ example: 'for spam', description: 'user did some spams' })
  @IsString()
  readonly ban_reason: string;
}