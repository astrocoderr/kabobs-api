import {
  BelongsTo, BelongsToMany, Column,
  DataType, ForeignKey, Model, Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/models/user.model';
import { GroupIngredient } from '../../group-ingredients/models/group-ingredients.model';
import { Techcard } from '../../techcards/models/techcards.model';
import {
  IngredientGroupAssociations,
} from '../../group-ingredients/models/ingredient-group-associations.model';


// ingredient creation attributes
interface IngredientFields {
  kcal: number;
  prot: number;
  fat: number;
  carb: number;
  name: string;
  group_id: number;
  unit: string;
  brutto: number;
  netto: number;
  percent: number;
  tags: string;
}

// ingredients model
@Table({ tableName: 'ingredients' })
export class Ingredient extends Model<Ingredient, IngredientFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

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
  @BelongsToMany(() => GroupIngredient, () => IngredientGroupAssociations)
  group: number;

  @ForeignKey(() => GroupIngredient)
  group_id: number

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
  @BelongsTo(() => User)
  creator: number;

  @ForeignKey(() => User)
  creator_id: number

  @ApiProperty({ example: '230', description: 'kcal' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  kcal: number;

  @ApiProperty({ example: '100', description: 'protein' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  prot: number;

  @ApiProperty({ example: '50', description: 'fat' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  fat: number;

  @ApiProperty({ example: '36', description: 'carb' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  carb: number;

  @ApiProperty({ example: 'apple', description: 'ingredient name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '500', description: 'brutto' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  brutto: number;

  @ApiProperty({ example: '250', description: 'netto' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  netto: number;

  @ApiProperty({ example: '3', description: 'percent' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  percent: number;

  @ApiProperty({ example: 'unit', description: 'unit' })
  @Column({ type: DataType.STRING, allowNull: true })
  unit: string;

  @ApiProperty({ example: 'apple, pineapple', description: 'apple, pineapple' })
  @Column({ type: DataType.STRING, allowNull: true })
  tags: string;

  @ApiProperty({ example: true, description: 'is ingerdient is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @ApiProperty({
    example: '23', description: "techcards's identifier",
  })

  @BelongsTo(() => Techcard)
  techcard: number;

  @ForeignKey(() => Techcard)
  techcard_id: number
}