import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GroupIngredientsService } from './services/group-ingredients.service';
import { GroupIngredientsController } from './controllers/group-ingredients.controller';
import { GroupIngredient } from './models/group-ingredients.model';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { AuthModule } from '../auth/auth.module';
import {
  IngredientGroupAssociations
} from './models/ingredient-group-associations.model';


@Module({
  providers: [GroupIngredientsService],
  controllers: [GroupIngredientsController],
  imports: [
    SequelizeModule.forFeature([
      GroupIngredient, IngredientGroupAssociations
    ]),
    AuthModule,
    forwardRef(() => IngredientsModule),
  ],
  exports: [
    GroupIngredientsModule,
    GroupIngredientsService
  ]
})
export class GroupIngredientsModule {}
