import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { Customer } from './models/customers.model';
import { Addresses } from '../addresses/models/addresses.model';
import { CustomerAddresses } from '../addresses/models/customer-addresses.model';
import { AddressesModule } from '../addresses/addresses.module';
import { AuthModule } from '../auth/auth.module';
import { Promocode } from '../promocodes/models/promocodes.model';
import { Order } from '../orders/models/orders.model';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchens/models/kitchen-users.model';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser
    ]),
    AddressesModule,
    AuthModule
  ],
  exports: [
    CustomersService
  ]
})
export class CustomersModule {}
