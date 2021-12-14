import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { AddressesService } from '../../addresses/services/addresses.service';
import { ConfigService } from '@nestjs/config';
import { Order } from '../models/orders.model';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    private addressService: AddressesService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating an orders
  async createOrder(dto: CreateOrderDto){
    try{
      const order = await this.orderModel.create(dto)

      const address = await this.addressService.getAddress(dto.addressID)

      if(address){
        await order.$set('address', [address.id])
      }else{
        this.logger.error(`Error in orders.service.ts - 'address' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      return await this.orderModel.findByPk(order.id, { include: { all: true } })
    }catch(ex){
      this.logger.error(`Error in orders.service.ts - '${ex}'`);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting orders
  async getOrders(){
    return await this.orderModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting an orders
  async getOrder(id: number){
    return await this.orderModel.findByPk(id, { include: { all: true } });
  }

  // Editing an orders
  async modifyOrder(id: number, dto: UpdateOrderDto){
    const order = await this.orderModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in orders.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!order){
      this.logger.error(`Error in orders.service.ts - 'order' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return await this.orderModel.findByPk(order.id, { include: { all: true } })
  }

  // Removing an orders
  async removeOrder(id: number){
    const order = await this.orderModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in orders.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!order){
      this.logger.error(`Error in orders.service.ts - 'order' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return order
  }
}
