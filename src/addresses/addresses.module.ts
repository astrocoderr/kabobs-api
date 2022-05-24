import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AddressesController } from './controllers/addresses.controller';
import { AddressesService } from './services/addresses.service';
import { Addresses } from './models/addresses.model';
import {
  CustomerAddressesAssociations
} from './models/customer-addresses-associations.model';
import {
  OrderAddressesAssociations
} from './models/order-addresses-associations.model';
import {
  KitchenAddressesAssociations
} from './models/kitchen-addresses-associations.model';


@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [
    SequelizeModule.forFeature([
      Addresses, OrderAddressesAssociations, KitchenAddressesAssociations,
      CustomerAddressesAssociations
    ])
  ],
  exports: [
    AddressesService
  ]
})
export class AddressesModule {}
