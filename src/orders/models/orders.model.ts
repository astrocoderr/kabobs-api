import {
  BelongsToMany, Column,
  DataType, ForeignKey, HasMany, Model, Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Addresses } from '../../addresses/models/addresses.model';
import { User } from '../../users/models/user.model';
import { Customer } from '../../customers/models/customers.model';
import { ManagerOrdersAssociations } from './manager-orders-associations.model';
import { CreatorOrdersAssociations } from './creator-orders-associations.model';
import { CustomerOrdersAssociations } from './customer-orders-associations';
import { OrderDays } from '../../order-days/models/order-days.model';


// orders creation attributes
interface OrderFields {
  customer_id: number;
  manager_id: number;
  creator_id: number;
  promocode_id: number;
  kcal: number;
  prot: number;
  fat: number;
  carb: number;
  start_date: Date;
  length: number;
  meals_per_day: number;
  week_size: number;
  original_price: number;
  total_price: number;
  ignored_meals: string;
  address_id: number;
  kitchen_comment: string;
  delivery_comment: string;
  delivery_time: Date;
  status: number;
  source: number;
}

// orders model
@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderFields>{
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
  @BelongsToMany(() => Customer, () => CustomerOrdersAssociations)
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
  @BelongsToMany(() => User, () => ManagerOrdersAssociations)
  manager: number;

  @ForeignKey(() => User)
  manager_id: number

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
  @BelongsToMany(() => User, () => CreatorOrdersAssociations)
  creator: number;

  @ForeignKey(() => User)
  creator_id: number

  @ApiProperty({ example: '230', description: 'kcal' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  promocode_id: number;

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
  @HasMany(() => Addresses)
  address: number;

  @ForeignKey(() => Addresses)
  address_id: number

  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: "start date" })
  @Column({ type: DataType.DATE, allowNull: false })
  start_date: Date;

  @ApiProperty({
    example: '5',
    description: 'how long will proceed orders. start date + 5 days'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  length: number;

  @ApiProperty({
    example: '3',
    description: 'week size, f.i. 3 means 3 days continuously, days starts from monday'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  week_size: number;

  @ApiProperty({
    example: '2',
    description: 'meals per day, f.i. 2 means in the morning and in the evening'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  meals_per_day: number;

  @ApiProperty({ example: '500', description: '500 czech koruna' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  original_price: number;

  @ApiProperty({ example: '500', description: '500 czech koruna' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  total_price: number;

  @ApiProperty({ example: true, description: 'is orders is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @ApiProperty({ example: '2,11,98', description: 'ignored meals identifiers' })
  @Column({ type: DataType.STRING, allowNull: true })
  ignored_meals: string;

  @ApiProperty({ example: 'new meal from spain', description: "kitchens's comment" })
  @Column({ type: DataType.STRING, allowNull: true  })
  kitchen_comment: string;

  @ApiProperty({ example: 'new address without roads', description: "delivery's comment" })
  @Column({ type: DataType.STRING, allowNull: true })
  delivery_comment: string;

  @ApiProperty({ example: '2021-11-12T06:20:56.582Z', description: 'delivery time' })
  @Column({ type: DataType.DATE, allowNull: true })
  delivery_time: Date;

  @ApiProperty({ example: 1, description: 'new' })
  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  status: number;

  @ApiProperty({ example: 1, description: 'web' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  source: number;

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
  @HasMany(() => OrderDays)
  order_day: number;

  @ForeignKey(() => OrderDays)
  order_day_id: number
}