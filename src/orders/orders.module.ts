import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { AuthModule } from '../auth/auth.module';
import { Order } from './models/orders.model';
import { AddressesModule } from '../addresses/addresses.module';
import { UsersModule } from '../users/users.module';
import { PromocodesModule } from '../promocodes/promocodes.module';
import { CustomersModule } from '../customers/customers.module';
import { OrderDaysModule } from '../order-days/order-days.module';
import { CreatorOrdersAssociations } from './models/creator-orders-associations.model';
import { CustomerOrdersAssociations } from './models/customer-orders-associations';
import { ManagerOrdersAssociations } from './models/manager-orders-associations.model';


@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([
      Order, CreatorOrdersAssociations, CustomerOrdersAssociations,
      ManagerOrdersAssociations
    ]),
    AuthModule,
    AddressesModule,
    UsersModule,
    PromocodesModule,
    CustomersModule,
    OrderDaysModule
  ]
})
export class OrdersModule {}
