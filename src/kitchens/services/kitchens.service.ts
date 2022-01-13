import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { AddressesService } from '../../addresses/services/addresses.service';
import { CreateKitchenDto } from '../dto/create-kitchen.dto';
import { Kitchen } from '../models/kitchens.model';
import { UpdateKitchenDto } from '../dto/update-kitchen.dto';


@Injectable()
export class KitchensService {
  constructor(
    @InjectModel(Kitchen) private kitchenModel: typeof Kitchen,
    private addressService: AddressesService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a kitchens
  async createKitchen(dto: CreateKitchenDto){
    try{
      const address = await this.addressService.getAddress(dto.address)

      if(!address.success){
        this.logger.error(`Error in kitchens.service.ts - 'createKitchen()'. Address not found`);
        throw new HttpException({
          success: false,
          message: `Address not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const kitchen = await this.kitchenModel.create({
        ...dto
      })

      await kitchen.$set('address', [address.data.address.id])

      const newKitchen = await this.kitchenModel.findByPk(kitchen.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Kitchen created successfully',
        data: {
          kitchen: newKitchen
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens.service.ts - 'createKitchen()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting kitchens
  async getKitchens(){
    try{
      const kitchens = await this.kitchenModel.findAll({
        where: { active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Kitchens fetched successfully',
        data: {
          kitchens
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens.service.ts - 'getKitchens()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a kitchens
  async getKitchen(id: number){
    try{
      const kitchen = await this.kitchenModel.findByPk(id, { include: { all: true } });

      if(!kitchen){
        this.logger.error(
          `Error in kitchens.service.ts - 'getKitchen()'. Kitchen not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Kitchen fetched successfully',
        data: {
          kitchen
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens.service.ts - 'getKitchen()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a kitchens
  async modifyKitchen(id: number, dto: UpdateKitchenDto){
    try{
      const kitchen = await this.kitchenModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in kitchens.service.ts - 'modifyKitchen()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!kitchen){
        this.logger.error(
          `Error in kitchens.service.ts - 'modifyKitchen()'. Kitchen not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newKitchen = await this.kitchenModel.findByPk(kitchen.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Kitchen modified successfully',
        data: {
          kitchen: newKitchen
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens.service.ts - 'modifyKitchen()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a kitchens
  async removeKitchen(id: number){
    try{
      const kitchen = await this.kitchenModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in kitchens.service.ts - 'removeKitchen()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!kitchen){
        this.logger.error(
          `Error in kitchens.service.ts - 'removeKitchen()'. Kitchen not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newKitchen = await this.kitchenModel.findByPk(kitchen.id, { include: { all: true } })

      return {
        success: true,
        message: 'Kitchen removed successfully',
        data: {
          kitchen: newKitchen
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens.service.ts - 'removeKitchen()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
