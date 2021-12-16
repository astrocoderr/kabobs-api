import { Module } from '@nestjs/common';
import { AddressesController } from './controllers/addresses.controller';
import { AddressesService } from './services/addresses.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "../roles/models/roles.model";
import { User } from "../users/models/user.model";
import { UserRoles } from "../roles/models/user-roles.model";
import { Customer } from "../customers/models/customers.model";
import { Addresses } from "./models/addresses.model";
import { CustomerAddresses } from "./models/customer-addresses.model";
import { Promocode } from '../promocodes/models/promocodes.model';
import { Order } from '../orders/models/orders.model';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchens/models/kitchen-users.model';
import { OrderDays } from '../order-days/models/order-days.model';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [
    SequelizeModule.forFeature([
      Role, User, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser, OrderDays
    ])
  ],
  exports: [
    AddressesService
  ]
})
export class AddressesModule {}
