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

      // const newOrderDay = await this.orderDayModel.findByPk(orderDay.id, {
      //   include: { all: true }
      // })

      return {
        success: true,
        message: 'Order day created successfully',
        data: {
          orderDay
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in order-days.service.ts - 'createOrderDay()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting order-days
  async getOrderDays(){
    try{
      const orderDays = await this.orderDayModel.findAll({
        where: { active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Order days fetched successfully',
        data: {
          orderDays
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in order-days.service.ts - 'getOrderDays()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting an order-day
  async getOrderDay(id: number){
    try{
      const orderDay = await this.orderDayModel.findByPk(id, { include: { all: true } });

      if(!orderDay){
        this.logger.error(
          `Error in order-days.service.ts - 'getOrderDay()'. Order day not found`
        );
        throw new HttpException({
          success: false,
          message: `Order day not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Order day fetched successfully',
        data: {
          orderDay
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in order-days.service.ts - 'getOrderDay()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing an order-day
  async modifyOrderDay(id: number, dto: UpdateOrderDayDto){
    try{
      const orderDay = await this.orderDayModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in order-days.service.ts - 'modifyOrderDay()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!orderDay){
        this.logger.error(
          `Error in order-days.service.ts - 'modifyOrderDay()'. Order day not found`
        );
        throw new HttpException({
          success: false,
          message: `Order day not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Order day modified successfully',
        data: {
          orderDay
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in order-days.service.ts - 'modifyOrderDay()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing an order-day
  async removeOrderDay(id: number){
    try{
      const orderDay = await this.orderDayModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in order-days.service.ts - 'removeOrderDay()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!orderDay){
        this.logger.error(
          `Error in order-days.service.ts - 'removeOrderDay()'. Order day not found`
        );
        throw new HttpException({
          success: false,
          message: `Order day not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Order day removed successfully',
        data: {
          orderDay
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in order-days.service.ts - 'removeOrderDay()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
