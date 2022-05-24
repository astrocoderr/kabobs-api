import {
  Column, DataType, ForeignKey, BelongsToMany,
  Model, Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Techcard } from '../../techcards/models/techcards.model';
import {
  TagsTechcardsAssociations
} from '../../techcards/models/tags-techcards-associations.model';


// tag creation attributes
interface TagFields {
  ru: string;
  cz: string;
  en: string;
  techcard_id: number;
}

// tag model
@Table({ tableName: 'tags' })
export class Tag extends Model<Tag, TagFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'ru', description: 'ru' })
  @Column({ type: DataType.STRING, allowNull: false })
  ru: string;

  @ApiProperty({ example: 'cz', description: 'cz' })
  @Column({ type: DataType.STRING, allowNull: false })
  cz: string;

  @ApiProperty({ example: 'en', description: 'en' })
  @Column({ type: DataType.STRING, allowNull: false })
  en: string;

  @ApiProperty({
    example: {
      "id": 2,
      "text": "Delaware, St. Riston 1A-22",
      "lat": 12.345678,
      "lon": 23.456798,
      "road": "Avenue, 1C",
      "houseNumber": "42a BBC",
      "neighbourhood": "smth",
      "zipcode": 12345,
      "active": true,
      "createdAt": "2021-11-12T06:15:55.612Z",
      "updatedAt": "2021-11-12T06:15:55.612Z",
      "CustomerAddresses": {
        "id": 2,
        "addressID": 2,
        "customerID": 7,
        "createdAt": "2021-11-12T06:20:56.582Z",
        "updatedAt": "2021-11-12T06:20:56.582Z"
      }
    },
    type: 'object',
    description: 'role identifier'
  })
  @BelongsToMany(() => Techcard, () => TagsTechcardsAssociations)
  techcard: number;

  @ForeignKey(() => Techcard)
  techcard_id: number

  @ApiProperty({ example: true, description: 'is techcard tag is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;
}