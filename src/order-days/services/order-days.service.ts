import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { OrderDays } from '../models/order-days.model';
import { CreateOrderDayDto } from '../dto/create-order-days.dto';
import { UpdateOrderDayDto } from '../dto/update-order-days.dto';


@Injectable()
export class OrderDaysService {
  constructor(
    @InjectModel(OrderDays) private orderDayModel: typeof OrderDays,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating an order-day
  async createOrderDay(dto: CreateOrderDayDto){
    try{
      const orderDay = await this.orderDayModel.create(dto)

      return await this.orderDayModel.findByPk(orderDay.id, { include: { all: true } })
    }catch(ex){
      this.logger.error(`Error in order-days.service.ts - '${ex}'`);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting order-days
  async getOrderDays(){
    return await this.orderDayModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting an order-day
  async getOrderDay(id: number){
    return await this.orderDayModel.findByPk(id, { include: { all: true } });
  }

  // Editing an order-day
  async modifyOrderDay(id: number, dto: UpdateOrderDayDto){
    const orderDay = await this.orderDayModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in order-days.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!orderDay){
      this.logger.error(`Error in order-days.service.ts - 'orderDay' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return await this.orderDayModel.findByPk(orderDay.id, { include: { all: true } })
  }

  // Removing an order-day
  async removeOrderDay(id: number){
    const orderDay = await this.orderDayModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in order-days.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!orderDay){
      this.logger.error(`Error in order-days.service.ts - 'orderDay' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return orderDay
  }
}
