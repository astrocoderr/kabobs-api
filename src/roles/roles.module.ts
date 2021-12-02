import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { Role } from './models/roles.model';
import { User } from '../users/models/user.model';
import { UserRoles } from './models/user-roles.model';
import { Customer } from '../customers/models/customer.model';
import { Addresses } from '../addresses/models/addresses.model';
import { CustomerAddresses } from '../addresses/models/customer-addresses.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([
      Role, User, UserRoles, Customer,
      Addresses, CustomerAddresses
    ]),
    AuthModule
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
