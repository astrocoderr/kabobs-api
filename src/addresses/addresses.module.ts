import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AddressesController } from './controllers/addresses.controller';
import { AddressesService } from './services/addresses.service';
import { Role } from '../roles/models/roles.model';
import { User } from '../users/models/user.model';
import {
  UserRolesAssociations
} from '../roles/models/user-roles-associations.model';
import { Customer } from '../customers/models/customers.model';
import { Addresses } from './models/addresses.model';
import {
  CustomerAddressesAssociations
} from './models/customer-addresses-associations.model';
import { Promocode } from '../promocodes/models/promocodes.model';
import { Order } from '../orders/models/orders.model';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchen-users/models/kitchen-users.model';
import { OrderDays } from '../order-days/models/order-days.model';
import {
  GroupIngredient
} from '../group-ingredients/models/group-ingredients.model';
import { Ingredient } from '../ingredients/models/ingredients.model';
import { Techcard } from '../techcards/models/techcards.model';
import {
  OrderAddressesAssociations
} from './models/order-addresses-associations.model';
import {
  KitchenAddressesAssociations
} from './models/kitchen-addresses-associations.model';
import {
  IngredientGroupAssociations,
} from '../group-ingredients/models/ingredient-group-associations.model';
import {
  IngredientTechcardsAssociations,
} from '../techcards/models/ingredient-techcards-associations.model';


@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [
    SequelizeModule.forFeature([
      Role, User, UserRolesAssociations, Customer, Addresses, CustomerAddressesAssociations,
      Promocode, Order, OrderAddressesAssociations, Kitchen, KitchenAddressesAssociations,
      KitchenUser, OrderDays, GroupIngredient,
      Ingredient, IngredientGroupAssociations, Techcard, IngredientTechcardsAssociations
    ])
  ],
  exports: [
    AddressesService
  ]
})
export class AddressesModule {}
