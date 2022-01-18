import {
  BelongsTo, BelongsToMany, Column, DataType, ForeignKey,
  Model, Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/models/user.model';
import { Ingredient } from '../../ingredients/models/ingredients.model';
import {
  IngredientTechcardsAssociations
} from './ingredient-techcards-associations.model';


// techcards creation attributes
interface TechcardFields {
  type: string;
  title: string;
  marketing_title: string;
  description: string;
  ingredient_id: number;
  ingredients_amount: number;
  amount: number;
  brutto: number;
  kcal: number;
  prot: number;
  fat: number;
  carb: number;
  unit: number;
  amount_piece: number;
  percent: number;
  tags: string;
  boxes_small: number;
  boxes_medium: number;
  boxes_big: number;
}

// techcard model
@Table({ tableName: 'techcards' })
export class Techcard extends Model<Techcard, TechcardFields>{
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
  @BelongsToMany(() => Ingredient, () => IngredientTechcardsAssociations)
  ingredient: number;

  @ForeignKey(() => Ingredient)
  ingredient_id: number

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

  @ApiProperty({ example: 'type', description: 'type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @ApiProperty({ example: 'title', description: 'title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'marketing title', description: 'marketing title' })
  @Column({ type: DataType.STRING, allowNull: true })
  marketing_title: string;

  @ApiProperty({ example: '3', description: 'ingredients amount' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  ingredients_amount: number;

  @ApiProperty({ example: '500', description: 'amount' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;

  @ApiProperty({ example: true, description: 'is techcard is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @ApiProperty({ example: '98', description: 'brutto' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  brutto: number;

  @ApiProperty({ example: '0', description: 'false' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  unit: number;

  @ApiProperty({ example: '2', description: 'amount piece' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  amount_piece: number;

  @ApiProperty({ example: '5', description: 'percent' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  percent: number;

  @ApiProperty({ example: 'apple, pineapple', description: 'apple, pineapple' })
  @Column({ type: DataType.STRING, allowNull: true })
  tags: string;

  @ApiProperty({ example: 3, description: '3 small boxes' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  boxes_small: number;

  @ApiProperty({ example: 2, description: '2 medium boxes' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  boxes_medium: number;

  @ApiProperty({ example: 1, description: '1 big box' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  boxes_big: number;

  @ApiProperty({ example: 'description', description: 'description' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;
}