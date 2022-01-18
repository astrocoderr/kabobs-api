import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Customer } from '../../customers/models/customers.model';
import { Order } from './orders.model';

// customer_orders_associations model
@Table({ tableName: 'customer_orders_associations' })
export class CustomerOrdersAssociations extends Model<CustomerOrdersAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customer_id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  order_id: number;
}