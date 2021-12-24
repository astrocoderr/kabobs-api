import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GroupIngredientsService } from './services/group-ingredients.service';
import { GroupIngredientsController } from './controllers/group-ingredients.controller';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { Customer } from '../customers/models/customers.model';
import { Addresses } from '../addresses/models/addresses.model';
import { CustomerAddresses } from '../addresses/models/customer-addresses.model';
import { Promocode } from '../promocodes/models/promocodes.model';
import { Order } from '../orders/models/orders.model';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchens/models/kitchen-users.model';
import { OrderDays } from '../order-days/models/order-days.model';
import { GroupIngredient } from './models/group-ingredients.model';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { Ingredient } from '../ingredients/models/ingredients.model';
import { AuthModule } from '../auth/auth.module';
import { Techcard } from '../techcards/models/techcards.model';


@Module({
  providers: [GroupIngredientsService],
  controllers: [GroupIngredientsController],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser, OrderDays,
      GroupIngredient, Ingredient, Techcard
    ]),
    AuthModule,
    forwardRef(() => IngredientsModule),
  ],
  exports: [
    GroupIngredientsModule
  ]
})
export class GroupIngredientsModule {}
