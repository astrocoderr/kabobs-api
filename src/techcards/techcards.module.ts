import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TechcardsController } from './controllers/techcards.controller';
import { TechcardsService } from './services/techcards.service';
import { Role } from '../roles/models/roles.model';
import { User } from '../users/models/user.model';
import {
  UserRolesAssociations
} from '../roles/models/user-roles-associations.model';
import { Customer } from '../customers/models/customers.model';
import { Addresses } from '../addresses/models/addresses.model';
import {
  CustomerAddressesAssociations,
} from '../addresses/models/customer-addresses-associations.model';
import { Promocode } from '../promocodes/models/promocodes.model';
import { Order } from '../orders/models/orders.model';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchen-users/models/kitchen-users.model';
import { OrderDays } from '../order-days/models/order-days.model';
import {
  GroupIngredient
} from '../group-ingredients/models/group-ingredients.model';
import { Ingredient } from '../ingredients/models/ingredients.model';
import { Techcard } from './models/techcards.model';
import { AuthModule } from '../auth/auth.module';
import { IngredientsModule } from '../ingredients/ingredients.module';
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
  IngredientTechcardsAssociations
} from './models/ingredient-techcards-associations.model';


@Module({
  controllers: [TechcardsController],
  providers: [TechcardsService],
  imports: [
    SequelizeModule.forFeature([
      Role, User, UserRolesAssociations, Customer, Addresses, CustomerAddressesAssociations,
      Promocode, Order, OrderAddressesAssociations, Kitchen, KitchenAddressesAssociations,
      KitchenUser, OrderDays, GroupIngredient,
      Ingredient, IngredientGroupAssociations, Techcard, IngredientTechcardsAssociations
    ]),
    AuthModule,
    IngredientsModule
  ],
  exports: [
    TechcardsModule
  ]
})
export class TechcardsModule {}
