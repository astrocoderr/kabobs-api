import { ApiProperty } from "@nestjs/swagger";

export class AuthDto{
  @ApiProperty({ example: 'john@john.com', description: 'email of user' })
  readonly email: string;
  @ApiProperty({ example: 'qwerty123', description: 'password of user' })
  readonly password: string;
}