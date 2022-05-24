import {
  BelongsToMany, Column, DataType, Model, Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/models/user.model';
import { UserRolesAssociations } from './user-roles-associations.model';


// role creation attributes
interface RoleFields {
  name: string;
  description: string;
}

// roles model
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'user', description: 'unique name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'for customers', description: 'description for role' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: true, description: 'is role is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @BelongsToMany(() => User, () => UserRolesAssociations)
  user: User[]
}