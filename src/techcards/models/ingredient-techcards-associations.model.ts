import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Techcard } from './techcards.model';
import { Ingredient } from '../../ingredients/models/ingredients.model';

// ingredient_techcards_associations model
@Table({ tableName: 'ingredient_techcards_associations' })
export class IngredientTechcardsAssociations extends Model<IngredientTechcardsAssociations>{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => Techcard)
  @Column({ type: DataType.INTEGER })
  techcard_id: number;

  @ForeignKey(() => Ingredient)
  @Column({ type: DataType.INTEGER })
  ingredient_id: number;
}