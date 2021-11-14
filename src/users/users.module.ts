import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { Customer } from "../customers/models/customer.model";
import { Addresses } from "../addresses/models/addresses.model";
import { CustomerAddresses } from "../addresses/models/customer-addresses.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses
    ]),
    RolesModule
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
