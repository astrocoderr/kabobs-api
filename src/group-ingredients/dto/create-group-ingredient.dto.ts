import { ApiProperty } from '@nestjs/swagger';
import {
  IsString, MaxLength, MinLength
} from 'class-validator';

export class CreateGroupIngredientDto {
  @ApiProperty({ example: 'fruits', description: 'group ingredient name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly name: string;
}