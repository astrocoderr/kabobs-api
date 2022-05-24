import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { KitchenUsersService } from './services/kitchen-users.service';
import { KitchenUsersController } from './controllers/kitchen-users.controller';
import { KitchenUser } from './models/kitchen-users.model';
import { AuthModule } from '../auth/auth.module';
import { KitchensModule } from '../kitchens/kitchens.module';


@Module({
  providers: [KitchenUsersService],
  controllers: [KitchenUsersController],
  imports: [
    SequelizeModule.forFeature([ KitchenUser ]),
    AuthModule,
    KitchensModule
  ]
})
export class KitchenUsersModule {}
