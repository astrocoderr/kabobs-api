import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OrderDaysService } from './services/order-days.service';
import { OrderDays } from './models/order-days.model';


@Module({
  providers: [OrderDaysService],
  imports: [
    SequelizeModule.forFeature([ OrderDays ]),
  ],
  exports: [
    OrderDaysModule,
    OrderDaysService
  ]
})
export class OrderDaysModule {}
