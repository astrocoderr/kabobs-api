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
      const kitchenUser = await this.kitchenUserModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT')),
      })

      const kitchen = await this.kitchenService.getKitchen(dto.kitchen)

      if(kitchen){
        await kitchenUser.$set('kitchen', [kitchen.id])
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

  // Getting kitchen users
  async getKitchenUsers(){
    return await this.kitchenUserModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting a kitchen user
  async getKitchenUser(id: number){
    return await this.kitchenUserModel.findByPk(id, { include: { all: true } });
  }

  // Editing a kitchen user
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

    if(dto.password){
      kitchenUser.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

      await kitchenUser.save()
    }

    return await this.kitchenUserModel.findByPk(kitchenUser.id, { include: { all: true } })
  }

  // Removing a kitchen user
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

    return this.kitchenUserModel.findByPk(kitchenUser.id, { include: { all: true } })
  }
}