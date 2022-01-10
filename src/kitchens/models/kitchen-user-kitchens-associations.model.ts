import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Kitchen } from './kitchens.model';
import { KitchenUser } from '../../kitchen-users/models/kitchen-users.model';

// kitchen_user_associations model
@Table({ tableName: 'kitchen_user_kitchens_associations' })
export class KitchenUserKitchensAssociations extends Model<KitchenUserKitchensAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Kitchen)
  @Column({ type: DataType.INTEGER })
  kitchenID: number;

  @ForeignKey(() => KitchenUser)
  @Column({ type: DataType.INTEGER })
  kitchenUserID: number;
}