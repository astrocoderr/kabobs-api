import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston'

import { KitchenUser } from '../models/kitchen-users.model';
import { KitchensService } from '../../kitchens/services/kitchens.service';
import { CreateKitchenUserDto } from '../dto/create-kitchen-user.dto';
import { UpdateKitchenUserDto } from '../dto/update-kitchen-user.dto';
import { GetKitchenUsersDto } from '../dto/get-kitchen-users.dto';


@Injectable()
export class KitchenUsersService {
  constructor(
    @InjectModel(KitchenUser) private kitchenUserModel: typeof KitchenUser,
    private kitchenService: KitchensService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a kitchen user
  async createKitchenUser(dto: CreateKitchenUserDto){
    try{
      const kitchen = await this.kitchenService.getKitchen(dto.kitchen_id)

      if(!kitchen.success){
        this.logger.error(`Error in kitchen-users.service.ts - 'createkitchenUser()'. Kitchen user not found`);
        throw new HttpException({
          success: false,
          message: `Kitchen user not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const kitchen_user = await this.kitchenUserModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT')),
      })

      await kitchen_user.$set('kitchen', [kitchen.result.kitchen.id])

      const new_kitchen_user = await this.kitchenUserModel.findByPk(kitchen_user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Kitchen user created successfully',
        result: {
          kitchen_user: new_kitchen_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'createKitchenUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting kitchen users
  async getKitchenUsers(dto: GetKitchenUsersDto){
    try{
      const kitchen_users = await this.kitchenUserModel.findAndCountAll({
        where: { active: true },
        include: { all: true },
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit
      });

      return {
        success: true,
        message: 'Kitchen users fetched successfully',
        result: {
          kitchen_users
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'getKitchenUsers()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a kitchen user
  async getKitchenUser(id: number){
    try{
      const kitchen_user = await this.kitchenUserModel.findByPk(id, { include: { all: true } });

      if(!kitchen_user){
        this.logger.error(
          `Error in kitchens-users.service.ts - 'getKitchenUser()'. Kitchen user not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen user not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Kitchen user fetched successfully',
        result: {
          kitchen_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'getKitchenUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a kitchen user
  async modifyKitchenUser(id: number, dto: UpdateKitchenUserDto){
    try{
      const kitchen_user = await this.kitchenUserModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in kitchens-users.service.ts - 'modifyKitchenUser()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!kitchen_user){
        this.logger.error(
          `Error in kitchens-users.service.ts - 'modifyKitchenUser()'. Kitchen user not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen user not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      if(dto.password){
        kitchen_user.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

        await kitchen_user.save()
      }

      const new_kitchen_user = await this.kitchenUserModel.findByPk(kitchen_user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Kitchen user modified successfully',
        result: {
          kitchen_user: new_kitchen_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'modifyKitchenUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a kitchen user
  async removeKitchenUser(id: number){
    try{
      const kitchen_user = await this.kitchenUserModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in kitchens-users.service.ts - 'removeKitchenUser()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!kitchen_user){
        this.logger.error(
          `Error in kitchens-users.service.ts - 'removeKitchenUser()'. Kitchen user not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen user not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_kitchen_user = await this.kitchenUserModel.findByPk(kitchen_user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Kitchen user removed successfully',
        result: {
          kitchen_user: new_kitchen_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'removeKitchenUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
