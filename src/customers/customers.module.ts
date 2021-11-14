import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { User } from '../users/models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { Customer } from './models/customer.model';
import { Addresses } from "../addresses/models/addresses.model";
import { CustomerAddresses } from "../addresses/models/customer-addresses.model";
import { AddressesModule } from "../addresses/addresses.module";

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
    SequelizeModule.forFeature([
      User, Role, UserRoles, Customer,
      Addresses, CustomerAddresses
    ]),
    AddressesModule
  ],
  exports: [
    CustomersService
  ]
})
export class CustomersModule {}
