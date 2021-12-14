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

      return await this.promocodeModel.findByPk(promocode.id, { include: { all: true } })
    }catch(ex){
      this.logger.error(`Error in promocode.service.ts - '${ex}'`);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting promocodes
  async getPromocodes(){
    return await this.promocodeModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting a promocode
  async getPromocode(id: number){
    return await this.promocodeModel.findByPk(id, { include: { all: true } });
  }

  // Editing a promocode
  async modifyPromocode(id: number, dto: UpdatePromocodeDto){
    const promocode = await this.promocodeModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in roles.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!promocode) {
      this.logger.error(`Error in promocodes.service.ts - 'promocode' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return await this.promocodeModel.findByPk(promocode.id, { include: { all: true } })
  }

  // Removing a promocode
  async removePromocode(id: number){
    const promocode = await this.promocodeModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in roles.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); })

    if(!promocode){
      this.logger.error(`Error in promocodes.service.ts - 'promocode' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return promocode
  }
}
