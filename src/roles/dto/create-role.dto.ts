import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto{
  @ApiProperty({ example: 'user', description: "customer's role" })
  readonly name: string;
  @ApiProperty({ example: 'for customers', description: 'description for role' })
  readonly description: string;
}