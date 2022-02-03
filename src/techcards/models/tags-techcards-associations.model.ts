import {
  Column, DataType, ForeignKey,
  Model, Table
} from 'sequelize-typescript';

import { Techcard } from './techcards.model';
import { Tag } from '../../tags/models/tags.model';


// tags_techcards_associations model
@Table({ tableName: 'tags_techcards_associations' })
export class TagsTechcardsAssociations extends Model<TagsTechcardsAssociations>{
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

  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER })
  tag_id: number;
}