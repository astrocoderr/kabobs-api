import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { User } from '../../users/models/user.model';
import { Role } from './roles.model';

// users_roles_associations model
@Table({ tableName: 'user_roles_associations' })
export class UserRolesAssociations extends Model<UserRolesAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  role_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

}