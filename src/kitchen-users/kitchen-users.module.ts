import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { KitchenUsersService } from './services/kitchen-users.service';
import { KitchenUsersController } from './controllers/kitchen-users.controller';
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
import { Order } from '../orders/models/orders.model';
import {
  OrderAddressesAssociations
} from '../addresses/models/order-addresses-associations.model';
import { Kitchen } from '../kitchens/models/kitchens.model';
import {
  KitchenAddressesAssociations,
} from '../addresses/models/kitchen-addresses-associations.model';
import { KitchenUser } from './models/kitchen-users.model';
import { OrderDays } from '../order-days/models/order-days.model';
import { GroupIngredient } from '../group-ingredients/models/group-ingredients.model';
import { Ingredient } from '../ingredients/models/ingredients.model';
import {
  IngredientGroupAssociations,
} from '../group-ingredients/models/ingredient-group-associations.model';
import { Techcard } from '../techcards/models/techcards.model';
import {
  IngredientTechcardsAssociations,
} from '../techcards/models/ingredient-techcards-associations.model';
import { AuthModule } from '../auth/auth.module';
import { KitchensModule } from '../kitchens/kitchens.module';


@Module({
  providers: [KitchenUsersService],
  controllers: [KitchenUsersController],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRolesAssociations, Customer, Addresses, CustomerAddressesAssociations,
      Promocode, Order, OrderAddressesAssociations, Kitchen, KitchenAddressesAssociations,
      KitchenUser, OrderDays, GroupIngredient,
      Ingredient, IngredientGroupAssociations, Techcard, IngredientTechcardsAssociations
    ]),
    AuthModule,
    KitchensModule
  ]
})
export class KitchenUsersModule {}
