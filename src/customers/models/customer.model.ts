import {
  BelongsTo, BelongsToMany, Column,
  DataType, ForeignKey, HasOne, Model, Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from "../../roles/models/roles.model";
import { UserRoles } from "../../roles/models/user-roles.model";
import { Addresses } from "../../addresses/models/addresses.model";
import { CustomerAddresses } from "../../addresses/models/customer-addresses.model";

// customer creation attributes
interface CustomerFields {
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  gender: number;
  phone: string;
  additionalPhone: string;
  address: number;
  factorID: number;
  kitchenID: number;
  isVIP: boolean;
  language: string;
  managerID: number;
  status: boolean;
  password: string;
}

// customer model
@Table({ tableName: 'customers' })
export class Customer extends Model<Customer, CustomerFields>{
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

  @ApiProperty({ example: '1', description: 'male' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  gender: number;

  @ApiProperty({ example: '+420277007550', description: 'phone number' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone: string;

  @ApiProperty({ example: '+420277887555', description: 'additional phone number' })
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  additionalPhone: string;

  @ApiProperty({
    example: {
      "id": 2,
      "text": "Delaware, St. Riston 1A-22",
      "lat": 12.345678,
      "lon": 23.456798,
      "road": "Avenue, 1C",
      "houseNumber": "42a BBC",
      "neighbourhood": "smth",
      "zipcode": 12345,
      "active": true,
      "createdAt": "2021-11-12T06:15:55.612Z",
      "updatedAt": "2021-11-12T06:15:55.612Z",
      "CustomerAddresses": {
        "id": 2,
        "addressID": 2,
        "customerID": 7,
        "createdAt": "2021-11-12T06:20:56.582Z",
        "updatedAt": "2021-11-12T06:20:56.582Z"
      }
    },
    type: 'object',
    description: 'role identifier'
  })
  @BelongsToMany(() => Addresses, () => CustomerAddresses)
  address: number;

  @ApiProperty({ example: '44', description: 'factor identifier' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  factorID: number;

  @ApiProperty({ example: '3307', description: "customer's identifier in bitrix system" })
  @Column({ type: DataType.INTEGER, unique: true, allowNull: true })
  bitrixID: number;

  @ApiProperty({ example: '37', description: "kitchen's identifier" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  kitchenID: number;

  @ApiProperty({ example: 'false', description: 'is customer is vip' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVIP: boolean;

  @ApiProperty({ example: 'cz', description: "customer's preferred system language" })
  @Column({ type: DataType.STRING, defaultValue: 'en' })
  language: string;

  @ApiProperty({ example: '1', description: 'manager identifier' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  managerID: number;

  @ApiProperty({ example: true, description: 'is customer is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

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

  @ApiProperty({ example: 'true', description: 'user uses 2 factor authentication' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  twoFA: boolean;
}