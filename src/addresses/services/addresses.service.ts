import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";

import { Addresses } from "../models/addresses.model";
import { CreateAddressDto } from "../dto/create-address.dto";
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { GetAddressesDto } from '../dto/get-addresses.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Addresses) private addressModel: typeof Addresses,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async createAddress(dto: CreateAddressDto){
    try{
      const address = await this.addressModel.create(dto);

      return {
        success: true,
        message: 'Address created successfully',
        result: {
          address
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in addresses.service.ts - 'createAddress()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async getAddresses(dto: GetAddressesDto){
    try{
      const addresses = await this.addressModel.findAndCountAll({
        where: { active: true },
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit
      })

      return {
        success: true,
        message: 'Addresses fetched successfully',
        result: {
          addresses
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in addresses.service.ts - 'getAddresses()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  async getAddress(id: number){
    try{
      const address = await this.addressModel.findOne({ where: { id } })

      if(!address){
        this.logger.error(
          `Error in addresses.service.ts - 'getAddress()'. Address not found
        `);
        throw new HttpException({
          success: false,
          message: `Address not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Address fetched successfully',
        result: {
          address
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in addresses.service.ts - 'getAddress()'. ${ex.message}. ${ex.original}
      `);
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  async removeAddress(id: number){
    return await this.addressModel.update({ active: false }, {
      where: { id },
      returning: true
    })
      .then(newData => {
        return {
          success: true,
          message: 'Address removed successfully',
          result: {
            address: newData[1][0]
          }
        }
      })
      .catch(error => {
        this.logger.error(`Error in addresses.service.ts - 'removeAddress()'. ${error}`);
        throw new HttpException({
          success: false,
          message: error,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      })
  }
}
