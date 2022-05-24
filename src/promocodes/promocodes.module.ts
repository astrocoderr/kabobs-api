import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PromocodesController } from './controllers/promocodes.controller';
import { PromocodesService } from './services/promocodes.service';
import { Promocode } from './models/promocodes.model';
import { AuthModule } from '../auth/auth.module';
import {
  CustomerPromocodesAssociations
} from './models/customer-promocodes-associations.model';


@Module({
  controllers: [PromocodesController],
  providers: [PromocodesService],
  imports: [
    SequelizeModule.forFeature([
      Promocode, CustomerPromocodesAssociations
    ]),
    AuthModule
  ],
  exports: [
    PromocodesService
  ]
})
export class PromocodesModule {}
