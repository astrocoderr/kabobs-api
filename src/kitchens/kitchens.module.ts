import { Module } from '@nestjs/common';

import { KitchensController } from './controllers/kitchens.controller';
import { KitchensService } from './services/kitchens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { Customer } from '../customers/models/customers.model';
import { Addresses } from '../addresses/models/addresses.model';
import { CustomerAddresses } from '../addresses/models/customer-addresses.model';
import { Promocode } from '../promocodes/models/promocodes.model';
import { Order } from '../orders/models/orders.model';
import { AuthModule } from '../auth/auth.module';
import { Kitchen } from './models/kitchens.model';
import { AddressesModule } from '../addresses/addresses.module';
import { KitchenUsersController } from './controllers/kitchen-users.controller';
import { KitchenUsersService } from './services/kitchen-users.service';
import { KitchenUser } from './models/kitchen-users.model';
import { OrderDays } from '../order-days/models/order-days.model';
import { GroupIngredient } from '../group-ingredients/models/group-ingredients.model';
import { Ingredient } from '../ingredients/models/ingredients.model';
import { Techcard } from '../techcards/models/techcards.model';


@Module({
  controllers: [KitchensController, KitchenUsersController],
  providers: [KitchensService, KitchenUsersService],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser, OrderDays,
      GroupIngredient, Ingredient, Techcard
    ]),
    AuthModule,
    AddressesModule
  ]
})
export class KitchensModule {}
