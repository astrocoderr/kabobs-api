import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Customer } from './customers.model';
import { User } from '../../users/models/user.model';


// user_customers_associations model
@Table({ tableName: 'user_customers_associations' })
export class UserCustomersAssociations extends Model<UserCustomersAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customerID: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userID: number;
}