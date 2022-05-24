import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { User } from '../../users/models/user.model';
import { Order } from './orders.model';

// creator_orders_associations model
@Table({ tableName: 'creator_orders_associations' })
export class CreatorOrdersAssociations extends Model<CreatorOrdersAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  creator_id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  order_id: number;
}