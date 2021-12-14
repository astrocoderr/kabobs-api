import { Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Addresses } from '../../addresses/models/addresses.model';
import { KitchenUser } from './kitchen-users.model';


// kitchens creation attributes
interface KitchenFields {
  name: string;
  email: string;
  address: number;
}

// kitchens model
@Table({ tableName: 'kitchens' })
export class Kitchen extends Model<Kitchen, KitchenFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'Jack&Jones', description: 'name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'jackandjones@gmail.com', description: 'email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

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
    type: 'object'
  })
  @HasOne(() => Addresses)
  address: number;

  @ApiProperty({ example: true, description: 'is kitchens is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @ForeignKey(() => KitchenUser)
  kitchenUser: number
}