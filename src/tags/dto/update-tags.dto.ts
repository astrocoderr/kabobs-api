import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';


export class UpdateTagsDto {
  @ApiProperty({ example: 'ru', description: 'ru' })
  @IsString()
  readonly ru: string;

  @ApiProperty({ example: 'cz', description: 'cz' })
  @IsString()
  readonly cz: string;

  @ApiProperty({ example: 'en', description: 'en' })
  @IsString()
  readonly en: string;

  @ApiProperty({ example: '15', description: 'unique identifier' })
  @IsNumber()
  readonly techcard_id: number;
}