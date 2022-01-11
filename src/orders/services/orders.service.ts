import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { AddressesService } from '../../addresses/services/addresses.service';
import { Order } from '../models/orders.model';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { UsersService } from '../../users/services/users.service';
import { PromocodesService } from '../../promocodes/services/promocodes.service';
import { CustomersService } from '../../customers/services/customers.service';
import { OrderDaysService } from '../../order-days/services/order-days.service';
import { SearchOrderDto } from '../dto/search-order.dto';


@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    private userService: UsersService,
    private customerService: CustomersService,
    private addressService: AddressesService,
    private configService: ConfigService,
    private promocodeService: PromocodesService,
    private orderDaysService: OrderDaysService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating an order
  async createOrder(dto: CreateOrderDto){
    try{
      // managerID
      const manager = await this.userService.getUser(dto.managerID)

      if(!manager){
        this.logger.error(`Error in orders.service.ts - 'manager' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      // customerID
      const customer = await this.customerService.getCustomer(dto.customerID)

      if(!customer){
        this.logger.error(`Error in orders.service.ts - 'customer' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      // creatorID
      const creator = await this.userService.getUser(dto.managerID)

      if(!creator){
        this.logger.error(`Error in orders.service.ts - 'creator' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      let promocode;

      if(dto.promocodeID){
        // promocodeID
        promocode = await this.promocodeService.getPromocode(dto.promocodeID)

        if(!promocode){
          this.logger.error(`Error in orders.service.ts - 'promocode' is not found`);
          throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
        }
      }

      // addressID
      const address = await this.addressService.getAddress(dto.addressID)

      if(!address.success){
        this.logger.error(`Error in orders.service.ts - 'address' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }


      const order = await this.orderModel.create({
        ...dto,
        creatorID: creator.id
      })

      // meals logic
      const orderDays = await this.orderDaysService.createOrderDay({
        ...dto,
        creatorID: creator.id,
        orderID: order.id,
        date: order.startDate
      })

      if(!orderDays){
        this.logger.error(`Error in orders.service.ts - 'orderDays' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      try{
        await order.$set('manager', [manager.id])
      }catch(ex){

      }

      try{
        await order.$set('customer', [customer.id])
      }catch(ex){

      }

      try{
        await order.$set('creator', [manager.id])
      }catch(ex){

      }

      // try{
      //   await order.$set('o', [orderDays.id])
      // }catch(ex){
      //
      // }

      try{
        await order.$set('address', [address.data.address.id])
      }catch(ex){

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

  // Getting an order
  async getOrder(id: number){
    return await this.orderModel.findByPk(id, { include: { all: true } });
  }

  // Searching an order(s)
  async searchOrders(dto: SearchOrderDto){
    return await this.orderModel.findAll({
      where: {
        [Op.or]: [
          { customerID: dto.search },
          { userID: dto.search },
          { creatorID: dto.search },
          { promocodeID: dto.search },
          { kcal: dto.search },
          { prot: dto.search },
          { fat: dto.search },
          { carb: dto.search },
          { price: dto.search },
          { kitchenComment: dto.search },
          { deliveryComment: dto.search }
        ]
      },
      include: { all: true }
    })
  }

  // Editing an order
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

  // Removing an order
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
