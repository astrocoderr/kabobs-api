import { Module } from '@nestjs/common';
import { PromocodesController } from './controllers/promocodes.controller';
import { PromocodesService } from './services/promocodes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { Customer } from '../customers/models/customers.model';
import { Addresses } from '../addresses/models/addresses.model';
import { CustomerAddresses } from '../addresses/models/customer-addresses.model';
import { Promocode } from './models/promocodes.model';
import { AuthModule } from '../auth/auth.module';
import { Order } from '../orders/models/orders.model';
import { Kitchen } from '../kitchens/models/kitchens.model';
import { KitchenUser } from '../kitchens/models/kitchen-users.model';

@Module({
  controllers: [PromocodesController],
  providers: [PromocodesService],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses, Promocode,
      Order, Kitchen, KitchenUser
    ]),
    AuthModule
  ],
  exports: [
    PromocodesService
  ]
})
export class PromocodesModule {}
