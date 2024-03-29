import {
  BelongsToMany,
  Column, DataType, Model, Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Customer } from '../../customers/models/customers.model';
import { CustomerPromocodesAssociations } from './customer-promocodes-associations.model';


// promocode creation attributes
interface PromocodeFields {
  code: string;
  type: number;
  amount: number;
  status: number;
  usage: number;
  creator_id: number;
}

// promocode model
@Table({ tableName: 'promocodes' })
export class Promocode extends Model<Promocode, PromocodeFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: '1Ae78FlS@MPL3', description: 'code' })
  @Column({ type: DataType.STRING, allowNull: false })
  code: string;

  @ApiProperty({ example: '1', description: '1 - percentage, 2 - fixed' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  type: number;

  @ApiProperty({ example: '500', description: 'price amount' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;

  @ApiProperty({ example: '35', description: 'identifier of creator' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  creator_id: number;

  @ApiProperty({ example: '2', description: 'inactive' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  status: number;

  @ApiProperty({ example: '1', description: 'single usage' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  usage: number;

  @ApiProperty({ example: true, description: 'is promocode is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @BelongsToMany(() => Customer, () => CustomerPromocodesAssociations)
  customer: Customer[]
}