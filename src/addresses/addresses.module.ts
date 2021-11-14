import { Module } from '@nestjs/common';
import { AddressesController } from './controllers/addresses.controller';
import { AddressesService } from './services/addresses.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "../roles/models/roles.model";
import { User } from "../users/models/user.model";
import { UserRoles } from "../roles/models/user-roles.model";
import { Customer } from "../customers/models/customer.model";
import { Addresses } from "./models/addresses.model";
import { CustomerAddresses } from "./models/customer-addresses.model";

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [
    SequelizeModule.forFeature([
      Role, User, UserRoles, Customer,
      Addresses, CustomerAddresses
    ])
  ],
  exports: [
    AddressesService
  ]
})
export class AddressesModule {}
