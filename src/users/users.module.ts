import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { RolesModule } from '../roles/roles.module';
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
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser, OrderDays,
      GroupIngredient, Ingredient, Techcard
    ]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
