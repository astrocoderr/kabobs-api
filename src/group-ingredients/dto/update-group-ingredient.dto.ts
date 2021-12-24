import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean, IsString, MaxLength, MinLength
} from 'class-validator';

export class UpdateGroupIngredientDto {
  @ApiProperty({ example: 'fruits', description: 'group ingredient name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: true, description: 'is group-ingredients is active' })
  @IsBoolean()
  active: boolean;
}