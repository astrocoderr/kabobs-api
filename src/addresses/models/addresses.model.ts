import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Customer } from '../../customers/models/customer.model';
import { CustomerAddresses } from './customer-addresses.model';

// address creation attributes
interface AddressesFields {
  text: string;
  lat: number;
  lon: number;
  road: string;
  houseNumber: string;
  neighbourhood: string;
  zipcode: number;
}

// addresses model
@Table({ tableName: 'addresses' })
export class Addresses extends Model<Addresses, AddressesFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'Delaware, St. Riston 1A-22', description: 'full address' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  text: string;

  @ApiProperty({ example: '12.345678', description: 'latitude point' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  lat: number;

  @ApiProperty({ example: '23.456798', description: 'longitude point' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  lon: number;

  @ApiProperty({ example: 'Avenue, 1C', description: 'road address' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  road: string;

  @ApiProperty({ example: '42a BBC', description: 'house number' })
  @Column({ type: DataType.STRING, allowNull: false })
  houseNumber: string;

  @ApiProperty({ example: 'smth', description: 'smth' })
  @Column({ type: DataType.STRING, allowNull: false })
  neighbourhood: string;

  @ApiProperty({ example: '12345', description: "address's zipcode" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  zipcode: number;

  @ApiProperty({ example: true, description: 'is address is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @BelongsToMany(() => Customer, () => CustomerAddresses)
  customer: Customer[]
}