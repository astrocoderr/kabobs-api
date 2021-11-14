import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { User } from '../../users/models/user.model';
import { Role } from './roles.model';

// users_roles model
@Table({ tableName: 'user_roles' })
export class UserRoles extends Model<UserRoles>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleID: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userID: number;

}