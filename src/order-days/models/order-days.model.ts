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
  order_id: number;
  customer_id: number;
  kcal: number;
  prot: number;
  fat: number;
  carb: number;
  original_price: number;
  address_id: number;
  kitchen_comment: string;
  delivery_comment: string;
  delivery_time: Date;
  meals_per_day: number;
  ignored_meals: string;
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
  order_id: number

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
  customer_id: number

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

  @ApiProperty({ example: 'new meal from spain', description: "kitchens's comment" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null  })
  kitchen_comment: string;

  @ApiProperty({ example: 'new address without roads', description: "delivery's comment" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  delivery_comment: string;

  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'delivery time' })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  delivery_time: Date;

  @ApiProperty({
    example: '2',
    description: 'meals per day, f.i. 2 means in the morning and in the evening'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  meals_per_day: number;

  @ApiProperty({ example: true, description: 'is orders is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @ApiProperty({ example: '2,11,98', description: 'ignored meals identifiers' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  ignored_meals: string;

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