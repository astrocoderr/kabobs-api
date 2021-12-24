import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { Role } from './models/roles.model';
import { User } from '../users/models/user.model';
import { UserRoles } from './models/user-roles.model';
import { Customer } from '../customers/models/customers.model';
import { Addresses } from '../addresses/models/addresses.model';
import { CustomerAddresses } from '../addresses/models/customer-addresses.model';
import { AuthModule } from '../auth/auth.module';
import { Promocode } from '../promocodes/models/promocodes.model';
import { Order } from '../orders/models/orders.model';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchens/models/kitchen-users.model';
import { OrderDays } from '../order-days/models/order-days.model';
import { GroupIngredient } from '../group-ingredients/models/group-ingredients.model';
import { Ingredient } from '../ingredients/models/ingredients.model';
import { Techcard } from '../techcards/models/techcards.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([
      Role, User, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser, OrderDays,
      GroupIngredient, Ingredient, Techcard
    ]),
    AuthModule
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
