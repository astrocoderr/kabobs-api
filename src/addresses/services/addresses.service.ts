import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";

import { Addresses } from "../models/addresses.model";
import { CreateAddressDto } from "../dto/create-address.dto";
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Addresses) private addressModel: typeof Addresses,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async createAddress(dto: CreateAddressDto){
    return await this.addressModel.create(dto);
  }

  async getAddresses(){
    try{
      return await this.addressModel.findAll({ where: { active: true } })
    }catch(ex){
      this.logger.error(
        `Error in addresses.service.ts - 'getAddresses()'. ${ex.name}. ${ex.message}
      `);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  async getAddress(id: number){
    return await this.addressModel.findOne({ where: { id } })
  }

  async removeAddress(id: number){
    const address = await this.addressModel.update({ active: false }, {
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in addresses.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!address){
      this.logger.error(`Error in addresses.service.ts - 'address' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return address
  }
}
