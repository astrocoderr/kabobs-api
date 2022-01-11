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
      const kitchen = await this.kitchenModel.create({
        ...dto
      })

      const address = await this.addressService.getAddress(dto.address)

      if(address.success){
        await kitchen.$set('address', [address.data.address.id])
      }else{
        this.logger.error(`Error in kitchens.service.ts - 'address' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      return await this.kitchenModel.findByPk(kitchen.id, { include: { all: true } })
    }catch(ex){
      this.logger.error(
        `Error in kitchens.service.ts - 'createKitchen()'. ${ex.name}. ${ex.message}
      `);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting kitchens
  async getKitchens(){
    return await this.kitchenModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting a kitchens
  async getKitchen(id: number){
    return await this.kitchenModel.findByPk(id, { include: { all: true } });
  }

  // Editing a kitchens
  async modifyKitchen(id: number, dto: UpdateKitchenDto){
    const kitchen = await this.kitchenModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in kitchens.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!kitchen){
      this.logger.error(`Error in kitchens.service.ts - 'kitchen' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return await this.kitchenModel.findByPk(kitchen.id, { include: { all: true } })
  }

  // Removing a kitchens
  async removeKitchen(id: number){
    const kitchen = await this.kitchenModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in kitchens.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!kitchen){
      this.logger.error(`Error in kitchens.service.ts - 'kitchen' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return this.kitchenModel.findByPk(kitchen.id, { include: { all: true } })
  }
}
