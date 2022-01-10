import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto{
  @ApiProperty({ example: 'Delaware, St. Riston 1A-22', description: 'full address' })
  @IsString()
  readonly text: string;

  @ApiProperty({ example: '12.345678', description: 'latitude point' })
  @IsNumber()
  readonly lat: number;

  @ApiProperty({ example: '23.456798', description: 'longitude point' })
  @IsNumber()
  readonly lon: number;

  @ApiProperty({ example: 'Avenue, 1C', description: 'road address' })
  @IsString()
  readonly road: string;

  @ApiProperty({ example: '42a BBC', description: 'house number' })
  @IsString()
  readonly houseNumber: string;

  @ApiProperty({ example: 'smth', description: 'smth' })
  @IsString()
  readonly neighbourhood: string;

  @ApiProperty({ example: '12345', description: "address's zipcode" })
  @IsNumber()
  readonly zipcode: number;
}