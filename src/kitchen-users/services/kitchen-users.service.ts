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
      const kitchen = await this.kitchenService.getKitchen(dto.kitchen)

      if(!kitchen.success){
        this.logger.error(`Error in kitchen-users.service.ts - 'createkitchenUser()'. Kitchen user not found`);
        throw new HttpException({
          success: false,
          message: `Kitchen user not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const kitchenUser = await this.kitchenUserModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT')),
      })

      await kitchenUser.$set('kitchen', [kitchen.data.kitchen.id])

      const newKitchenUser = await this.kitchenUserModel.findByPk(kitchen.data.kitchen.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Kitchen user created successfully',
        data: {
          kitchenUser: newKitchenUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'createKitchenUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting kitchen users
  async getKitchenUsers(){
    try{
      const kitchenUsers = await this.kitchenUserModel.findAll({
        where: { active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Kitchen users fetched successfully',
        data: {
          kitchenUsers
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'getKitchenUsers()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a kitchen user
  async getKitchenUser(id: number){
    try{
      const kitchenUser = await this.kitchenUserModel.findByPk(id, { include: { all: true } });

      if(!kitchenUser){
        this.logger.error(
          `Error in kitchens-users.service.ts - 'getKitchenUser()'. Kitchen user not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen user not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Kitchen user fetched successfully',
        data: {
          kitchenUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'getKitchenUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a kitchen user
  async modifyKitchenUser(id: number, dto: UpdateKitchenUserDto){
    try{
      const kitchenUser = await this.kitchenUserModel.update(dto,{
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
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!kitchenUser){
        this.logger.error(
          `Error in kitchens-users.service.ts - 'modifyKitchenUser()'. Kitchen user not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen user not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      if(dto.password){
        kitchenUser.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

        await kitchenUser.save()
      }

      const newKitchenUser = await this.kitchenUserModel.findByPk(kitchenUser.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Kitchen user modified successfully',
        data: {
          kitchenUser: newKitchenUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'modifyKitchenUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a kitchen user
  async removeKitchenUser(id: number){
    try{
      const kitchenUser = await this.kitchenUserModel.update({ active: false },{
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
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!kitchenUser){
        this.logger.error(
          `Error in kitchens-users.service.ts - 'removeKitchenUser()'. Kitchen user not found`
        );
        throw new HttpException({
          success: false,
          message: `Kitchen user not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newKitchenUser = await this.kitchenUserModel.findByPk(kitchenUser.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Kitchen user removed successfully',
        data: {
          kitchenUser: newKitchenUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in kitchens-users.service.ts - 'removeKitchenUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
