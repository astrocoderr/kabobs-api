import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './models/customers.model';
import { AddressesModule } from '../addresses/addresses.module';
import { AuthModule } from '../auth/auth.module';
import { UserCustomersAssociations } from './models/user-customers-associations.model';
import { UsersModule } from '../users/users.module';


@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
    SequelizeModule.forFeature([
      Customer, UserCustomersAssociations
    ]),
    AddressesModule,
    AuthModule,
    UsersModule
  ],
  exports: [
    CustomersService
  ]
})
export class CustomersModule {}
