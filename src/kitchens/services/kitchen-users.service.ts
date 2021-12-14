import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { KitchenUser } from '../models/kitchen-users.model';
import { CreateKitchenUserDto } from '../dto/create-kitchen-user.dto';
import { KitchensService } from './kitchens.service';
import { UpdateKitchenUserDto } from '../dto/update-kitchen-user.dto';


@Injectable()
export class KitchenUsersService {
  constructor(
    @InjectModel(KitchenUser) private kitchenUserModel: typeof KitchenUser,
    private kitchenService: KitchensService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a kitchens user
  async createKitchenUser(dto: CreateKitchenUserDto){
    try{
      const kitchenUser = await this.kitchenUserModel.create({
        ...dto
      })

      const kitchen = await this.kitchenService.getKitchen(dto.kitchen)

      if(kitchen){
        // await kitchens.$set('kitchens', [kitchens.id])
      }else{
        this.logger.error(`Error in kitchen-users.service.ts - 'kitchen' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      return await this.kitchenUserModel.findByPk(kitchen.id, { include: { all: true } })
    }catch(ex){
      this.logger.error(`Error in kitchens-users.service.ts - '${ex}'`);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting kitchens users
  async getKitchenUsers(){
    return await this.kitchenUserModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting a kitchens user
  async getKitchenUser(id: number){
    return await this.kitchenUserModel.findByPk(id, { include: { all: true } });
  }

  // Editing a kitchens user
  async modifyKitchenUser(id: number, dto: UpdateKitchenUserDto){
    const kitchenUser = await this.kitchenUserModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in kitchen-users.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!kitchenUser){
      this.logger.error(`Error in kitchen-users.service.ts - 'kitchenUser' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return await this.kitchenUserModel.findByPk(kitchenUser.id, { include: { all: true } })
  }

  // Removing a kitchens user
  async removeKitchenUser(id: number){
    const kitchenUser = await this.kitchenUserModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in kitchen-users.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!kitchenUser){
      this.logger.error(`Error in kitchen-users.service.ts - 'kitchenUsers' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return kitchenUser
  }
}
