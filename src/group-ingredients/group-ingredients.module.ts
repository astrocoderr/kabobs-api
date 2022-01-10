import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GroupIngredientsService } from './services/group-ingredients.service';
import { GroupIngredientsController } from './controllers/group-ingredients.controller';
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
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchen-users/models/kitchen-users.model';
import { OrderDays } from '../order-days/models/order-days.model';
import { GroupIngredient } from './models/group-ingredients.model';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { Ingredient } from '../ingredients/models/ingredients.model';
import { AuthModule } from '../auth/auth.module';
import { Techcard } from '../techcards/models/techcards.model';
import {
  OrderAddressesAssociations
} from '../addresses/models/order-addresses-associations.model';
import {
  KitchenAddressesAssociations,
} from '../addresses/models/kitchen-addresses-associations.model';
import {
  IngredientGroupAssociations
} from './models/ingredient-group-associations.model';
import {
  IngredientTechcardsAssociations,
} from '../techcards/models/ingredient-techcards-associations.model';


@Module({
  providers: [GroupIngredientsService],
  controllers: [GroupIngredientsController],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRolesAssociations, Customer, Addresses, CustomerAddressesAssociations,
      Promocode, Order, OrderAddressesAssociations, Kitchen, KitchenAddressesAssociations,
      KitchenUser, OrderDays, GroupIngredient,
      Ingredient, IngredientGroupAssociations, Techcard, IngredientTechcardsAssociations
    ]),
    AuthModule,
    forwardRef(() => IngredientsModule),
  ],
  exports: [
    GroupIngredientsModule,
    GroupIngredientsService
  ]
})
export class GroupIngredientsModule {}