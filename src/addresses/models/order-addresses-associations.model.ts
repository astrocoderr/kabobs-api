import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Addresses } from './addresses.model';
import { Order } from '../../orders/models/orders.model';

// order_addresses_associations model
@Table({ tableName: 'order_addresses_associations' })
export class OrderAddressesAssociations extends Model<OrderAddressesAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Addresses)
  @Column({ type: DataType.INTEGER })
  addressID: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderID: number;
}