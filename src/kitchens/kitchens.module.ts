import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { KitchensController } from './controllers/kitchens.controller';
import { KitchensService } from './services/kitchens.service';
import { AuthModule } from '../auth/auth.module';
import { Kitchen } from './models/kitchens.model';
import { AddressesModule } from '../addresses/addresses.module';
import {
  KitchenUserKitchensAssociations
} from './models/kitchen-user-kitchens-associations.model';


@Module({
  controllers: [KitchensController],
  providers: [KitchensService],
  imports: [
    SequelizeModule.forFeature([
      Kitchen, KitchenUserKitchensAssociations
    ]),
    AuthModule,
    AddressesModule
  ],
  exports: [
    KitchensModule,
    KitchensService
  ]
})
export class KitchensModule {}
