import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { User } from '../../users/models/user.model';
import { Order } from './orders.model';

// manager_orders_associations model
@Table({ tableName: 'manager_orders_associations' })
export class ManagerOrdersAssociations extends Model<ManagerOrdersAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  manager_id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  order_id: number;
}