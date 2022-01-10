import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/roles.model';
import {
  UserRolesAssociations
} from '../roles/models/user-roles-associations.model';
import { Customer } from '../customers/models/customers.model';
import { Addresses } from '../addresses/models/addresses.model';
import {
  CustomerAddressesAssociations,
} from '../addresses/models/customer-addresses-associations.model';
import { Promocode } from '../promocodes/models/promocodes.model';
import { AuthModule } from '../auth/auth.module';
import { Order } from './models/orders.model';
import { AddressesModule } from '../addresses/addresses.module';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchen-users/models/kitchen-users.model';
import { UsersModule } from '../users/users.module';
import { PromocodesModule } from '../promocodes/promocodes.module';
import { CustomersModule } from '../customers/customers.module';
import { OrderDays } from '../order-days/models/order-days.model';
import { OrderDaysModule } from '../order-days/order-days.module';
import {
  GroupIngredient
} from '../group-ingredients/models/group-ingredients.model';
import { Ingredient } from '../ingredients/models/ingredients.model';
import { Techcard } from '../techcards/models/techcards.model';
import {
  OrderAddressesAssociations
} from '../addresses/models/order-addresses-associations.model';
import {
  KitchenAddressesAssociations,
} from '../addresses/models/kitchen-addresses-associations.model';
import {
  IngredientGroupAssociations,
} from '../group-ingredients/models/ingredient-group-associations.model';
import {
  IngredientTechcardsAssociations,
} from '../techcards/models/ingredient-techcards-associations.model';


@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRolesAssociations, Customer, Addresses, CustomerAddressesAssociations,
      Promocode, Order, OrderAddressesAssociations, Kitchen, KitchenAddressesAssociations,
      KitchenUser, OrderDays, GroupIngredient,
      Ingredient, IngredientGroupAssociations, Techcard, IngredientTechcardsAssociations
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
