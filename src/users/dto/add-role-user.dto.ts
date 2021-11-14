import { ApiProperty } from "@nestjs/swagger";

export class AddRoleUserDto{
  @ApiProperty({ example: '23', description: "user's identifier" })
  readonly userID: number;
  @ApiProperty({ example: '1', description: "role for user" })
  readonly roleID: number;
}