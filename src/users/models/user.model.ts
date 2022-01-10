import {
  BelongsToMany, Column, DataType, Model, Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../roles/models/roles.model';
import {
  UserRolesAssociations
} from '../../roles/models/user-roles-associations.model';


// user creation attributes
interface UserFields {
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  role: number;
  privilegeID: number;
  password: string;
  branchID: number;
  bitrixID: number;
}

// users model
@Table({ tableName: 'users' })
export class User extends Model<User, UserFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'first name' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Mathew', description: 'last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: '2021-11-11T10:00:00:000Z', description: 'birthday' })
  @Column({ type: DataType.DATE, allowNull: true })
  birthday: Date;

  @ApiProperty({ example: 'john@mathew.com', description: 'email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: {
      id: 1,
      name: "user",
      description: "role for user",
      createdAt: "2021-11-12T01:20:50.480Z",
      updatedAt: "2021-11-12T01:20:50.480Z",
      UserRoles: {
        id: 15,
        roleID: 1,
        userID: 30,
        createdAt: "2021-11-13T22:31:21.118Z",
        updatedAt: "2021-11-13T22:31:21.118Z"
      }
    },
    type: 'object',
    description: 'role identifier'
  })
  @BelongsToMany(() => Role, () => UserRolesAssociations)
  role: number;

  @ApiProperty({ example: '5', description: 'privilege identifier' })
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  privilegeID: number;

  @ApiProperty({
    example: '$2a$10$.DLLyE6GOFk2reMZml751eutkcrNawX2lCgqz0bXda55WYDZrLOcC',
    description: 'password'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'user is banned' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false  })
  banned: boolean;

  @ApiProperty({ example: 'for spam', description: 'fake user' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  banReason: string;

  @ApiProperty({ example: null, description: 'user paid commissions' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  unbanReason: string;

  @ApiProperty({ example: true, description: 'is address is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @ApiProperty({ example: '38', description: "delaware's branch identifier" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  branchID: number;

  @ApiProperty({ example: 'true', description: 'user uses 2 factor authentication' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  twoFA: boolean;

  @ApiProperty({ example: '1826', description: "user's identifier in bitrix system" })
  @Column({ type: DataType.INTEGER, unique: true, allowNull: true })
  bitrixID: number;
}