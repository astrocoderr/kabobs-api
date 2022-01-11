import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TechcardsController } from './controllers/techcards.controller';
import { TechcardsService } from './services/techcards.service';
import { Techcard } from './models/techcards.model';
import { AuthModule } from '../auth/auth.module';
import { IngredientsModule } from '../ingredients/ingredients.module';
import {
  IngredientTechcardsAssociations
} from './models/ingredient-techcards-associations.model';


@Module({
  controllers: [TechcardsController],
  providers: [TechcardsService],
  imports: [
    SequelizeModule.forFeature([
      Techcard, IngredientTechcardsAssociations
    ]),
    AuthModule,
    IngredientsModule
  ],
  exports: [
    TechcardsModule
  ]
})
export class TechcardsModule {}
