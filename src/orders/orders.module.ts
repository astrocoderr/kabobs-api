import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
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

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser
    ]),
    AuthModule,
    AddressesModule,
  ]
})
export class OrdersModule {}