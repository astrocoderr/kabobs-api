import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { Customer } from '../customers/models/customers.model';
import { Addresses } from '../addresses/models/addresses.model';
import { CustomerAddresses } from '../addresses/models/customer-addresses.model';
import { Promocode } from '../promocodes/models/promocodes.model';
import { AuthModule } from '../auth/auth.module';
import { Order } from './models/orders.model';
import { AddressesModule } from '../addresses/addresses.module';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchens/models/kitchen-users.model';
import { UsersModule } from '../users/users.module';
import { PromocodesModule } from '../promocodes/promocodes.module';
import { CustomersModule } from '../customers/customers.module';
import { OrderDays } from '../order-days/models/order-days.model';
import { OrderDaysModule } from '../order-days/order-days.module';


@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser, OrderDays
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
