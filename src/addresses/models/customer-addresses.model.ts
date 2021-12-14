import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Addresses } from './addresses.model';
import { Customer } from '../../customers/models/customers.model';

// customer_addresses model
@Table({ tableName: 'customer_addresses' })
export class CustomerAddresses extends Model<CustomerAddresses>{
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

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customerID: number;
}