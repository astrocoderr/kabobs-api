import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Promocode } from './promocodes.model';
import { Customer } from '../../customers/models/customers.model';

// customer_promocodes_associations model
@Table({ tableName: 'customer_promocodes_associations' })
export class CustomerPromocodesAssociations extends Model<CustomerPromocodesAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Promocode)
  @Column({ type: DataType.INTEGER })
  promocode_id: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customer_id: number;
}