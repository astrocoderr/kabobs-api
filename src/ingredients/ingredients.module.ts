import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { IngredientsController } from './controllers/ingredients.controller';
import { IngredientsService } from './services/ingredients.service';
import { Ingredient } from './models/ingredients.model';
import { GroupIngredientsModule } from '../group-ingredients/group-ingredients.module';
import { AuthModule } from '../auth/auth.module';


@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
  imports: [
    SequelizeModule.forFeature([ Ingredient ]),
    AuthModule,
    forwardRef(() => GroupIngredientsModule)
  ],
  exports: [
    IngredientsModule,
    IngredientsService
  ]
})
export class IngredientsModule {}
