import {
  BelongsTo, Column,
  DataType, ForeignKey, Model, Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/models/user.model';
import { Customer } from '../../customers/models/customers.model';
import { Order } from '../../orders/models/orders.model';


// order days creation attributes
interface OrderDaysFields {
  date: Date;
  orderID: number;
  customerID: number;
  kcal: number;
  prot: number;
  fat: number;
  carb: number;
  price: number;
  addressID: number;
  kitchenComment: string;
  deliveryComment: string;
  deliveryTime: Date;
  mealsPerDay: number;
  ignoredMeals: string;
  // kitchenID: number;
}

// order_days model
@Table({ tableName: 'order_days' })
export class OrderDays extends Model<OrderDays, OrderDaysFields>{
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
  @BelongsTo(() => Order)
  order: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Order)
  orderID: number

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
  @BelongsTo(() => Customer)
  customer: number;

  @ForeignKey(() => Customer)
  customerID: number

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
  creatorID: number

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

  @ApiProperty({ example: 'new meal from spain', description: "kitchens's comment" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null  })
  kitchenComment: string;

  @ApiProperty({ example: 'new address without roads', description: "delivery's comment" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  deliveryComment: string;

  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'delivery time' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  deliveryTime: Date;

  @ApiProperty({
    example: '2',
    description: 'meals per day, f.i. 2 means in the morning and in the evening'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  mealsPerDay: number;

  @ApiProperty({ example: true, description: 'is orders is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @ApiProperty({ example: '2,11,98', description: 'ignored meals identifiers' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  ignoredMeals: string;

  // @ApiProperty({
  //   example: {
  //     "id": 2,
  //     "text": "Delaware, St. Riston 1A-22",
  //     "lat": 12.345678,
  //     "lon": 23.456798,
  //     "road": "Avenue, 1C",
  //     "houseNumber": "42a BBC",
  //     "neighbourhood": "smth",
  //     "zipcode": 12345,
  //     "active": true,
  //     "createdAt": "2021-11-12T06:15:55.612Z",
  //     "updatedAt": "2021-11-12T06:15:55.612Z",
  //     "CustomerAddresses": {
  //       "id": 2,
  //       "addressID": 2,
  //       "customerID": 7,
  //       "createdAt": "2021-11-12T06:20:56.582Z",
  //       "updatedAt": "2021-11-12T06:20:56.582Z"
  //     }
  //   },
  //   type: 'object'
  // })
  // @BelongsTo(() => Kitchen)
  // kitchen: number;
  //
  // @ForeignKey(() => Kitchen)
  // kitchenID: number
}