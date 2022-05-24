import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { GroupIngredient } from './group-ingredients.model';
import { Ingredient } from '../../ingredients/models/ingredients.model';

// ingredient_group_associations model
@Table({ tableName: 'ingredient_group_associations' })
export class IngredientGroupAssociations extends Model<IngredientGroupAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => GroupIngredient)
  @Column({ type: DataType.INTEGER })
  group_ingredient_id: number;

  @ForeignKey(() => Ingredient)
  @Column({ type: DataType.INTEGER })
  ingredient_id: number;
}