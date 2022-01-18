import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Addresses } from './addresses.model';
import { Customer } from '../../customers/models/customers.model';


// customer_addresses_associations model
@Table({ tableName: 'customer_addresses_associations' })
export class CustomerAddressesAssociations extends Model<CustomerAddressesAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Addresses)
  @Column({ type: DataType.INTEGER })
  address_id: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customer_id: number;
}