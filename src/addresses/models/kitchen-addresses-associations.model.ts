import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Addresses } from './addresses.model';
import { Kitchen } from '../../kitchens/models/kitchens.model';

// kitchen_addresses_associations model
@Table({ tableName: 'kitchen_addresses_associations' })
export class KitchenAddressesAssociations extends Model<KitchenAddressesAssociations>{
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

  @ForeignKey(() => Kitchen)
  @Column({ type: DataType.INTEGER })
  kitchenID: number;
}