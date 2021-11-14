import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto{
  @ApiProperty({ example: 'Delaware, St. Riston 1A-22', description: 'full address' })
  readonly text: string;

  @ApiProperty({ example: '12.345678', description: 'latitude point' })
  readonly lat: number;

  @ApiProperty({ example: '23.456798', description: 'longitude point' })
  readonly lon: number;

  @ApiProperty({ example: 'Avenue, 1C', description: 'road address' })
  readonly road: string;

  @ApiProperty({ example: '42a BBC', description: 'house number' })
  readonly houseNumber: string;

  @ApiProperty({ example: 'smth', description: 'smth' })
  readonly neighbourhood: string;

  @ApiProperty({ example: '12345', description: "address's zipcode" })
  readonly zipcode: number;
}