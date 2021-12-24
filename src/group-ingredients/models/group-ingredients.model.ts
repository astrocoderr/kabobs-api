import {
  BelongsTo, Column, DataType,
  ForeignKey, Model, Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../../ingredients/models/ingredients.model';


// group-ingredients creation attributes
interface GroupIngredientFields {
  name: string;
}

// customer model
@Table({ tableName: 'group-ingredients' })
export class GroupIngredient extends Model<GroupIngredient, GroupIngredientFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'Fruits', description: 'group ingredient name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

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
  @BelongsTo(() => Ingredient)
  ingredient: number;

  @ForeignKey(() => Ingredient)
  ingredientID: number

  @ApiProperty({ example: true, description: 'is group ingredient is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;
}