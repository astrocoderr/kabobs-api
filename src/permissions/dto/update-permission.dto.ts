import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';


export class UpdatePermissionDto {
  @ApiProperty({ example: 'ADMIN', description: 'name of the permission' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'false', description: 'not able to create an object' })
  @IsBoolean()
  readonly create: boolean;

  @ApiProperty({ example: 'true', description: 'able to read an object' })
  @IsBoolean()
  readonly read: boolean;

  @ApiProperty({ example: 'false', description: 'not able to update an object' })
  @IsBoolean()
  readonly update: boolean;

  @ApiProperty({ example: 'false', description: 'not able to delete an object' })
  @IsBoolean()
  readonly delete: boolean;

  @ApiProperty({ example: 'false', description: 'not able to upload a file' })
  @IsBoolean()
  readonly upload: boolean;

  @ApiProperty({ example: 'false', description: 'not able to download a file' })
  @IsBoolean()
  readonly download: boolean;
}