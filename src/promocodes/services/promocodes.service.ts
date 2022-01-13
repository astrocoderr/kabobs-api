import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ConfigService } from '@nestjs/config';
import { Promocode } from '../models/promocodes.model';
import { CreatePromocodeDto } from '../dto/create-promocode.dto';
import { UpdatePromocodeDto } from '../dto/update-promocode.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Injectable()
export class PromocodesService {
  constructor(
    @InjectModel(Promocode) private promocodeModel: typeof Promocode,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a promocode
  async createPromocode(dto: CreatePromocodeDto){
    try{
      const promocode = await this.promocodeModel.create({
        ...dto,
        creatorID: 1
      })

      // return await this.promocodeModel.findByPk(promocode.id, { include: { all: true } })

      return {
        success: true,
        message: 'Promocode created successfully',
        data: {
          promocode
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in promocodes.service.ts - 'createPromocode()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting promocodes
  async getPromocodes(){
    try{
      const promocodes = await this.promocodeModel.findAll({
        where: { active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Promocodes fetched successfully',
        data: {
          promocodes
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in promocodes.service.ts - 'getPromocodes()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a promocode
  async getPromocode(id: number){
    try{
      const promocode = await this.promocodeModel.findByPk(id, { include: { all: true } });

      if(!promocode){
        this.logger.error(
          `Error in promocodes.service.ts - 'getPromocode()'. Promocode not found`
        );
        throw new HttpException({
          success: false,
          message: `Promocode not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Promocode fetched successfully',
        data: {
          promocode
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in promocodes.service.ts - 'getPromocode()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a promocode
  async modifyPromocode(id: number, dto: UpdatePromocodeDto){
    try{
      const promocode = await this.promocodeModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in promocodes.service.ts - 'modifyPromocode()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!promocode) {
        this.logger.error(
          `Error in promocodes.service.ts - 'modifyPromocode()'. Promocode not found`
        );
        throw new HttpException({
          success: false,
          message: `Promocode not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newPromocode = await this.promocodeModel.findByPk(promocode.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Promocode modified successfully',
        data: {
          promocode: newPromocode
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in promocodes.service.ts - 'modifyPromocode()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a promocode
  async removePromocode(id: number){
    try{
      const promocode = await this.promocodeModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in promocodes.service.ts - 'removePromocode()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!promocode){
        this.logger.error(
          `Error in promocodes.service.ts - 'removePromocode()'. Promocode not found`
        );
        throw new HttpException({
          success: false,
          message: `Promocode not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newPromocode = await this.promocodeModel.findByPk(promocode.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Promocode removed successfully',
        data: {
          promocode: newPromocode
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in promocodes.service.ts - 'removePromocode()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
