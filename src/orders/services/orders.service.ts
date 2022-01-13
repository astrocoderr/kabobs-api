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

      if(!manager.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Manager not found`
        );
        throw new HttpException({
          success: false,
          message: `Manager not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      // customerID
      const customer = await this.customerService.getCustomer(dto.customerID)

      if(!customer.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      // creatorID
      const creator = await this.userService.getUser(dto.managerID)

      if(!creator.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Creator not found`
        );
        throw new HttpException({
          success: false,
          message: `Creator not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      let promocode;

      if(dto.promocodeID){
        // promocodeID
        promocode = await this.promocodeService.getPromocode(dto.promocodeID)

        if(!promocode.success){
          this.logger.error(
            `Error in orders.service.ts - 'createOrder()'. Promocode not found`
          );
          throw new HttpException({
            success: false,
            message: `Promocode not found`,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        }
      }

      // addressID
      const address = await this.addressService.getAddress(dto.addressID)

      if(!address.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Address not found`
        );
        throw new HttpException({
          success: false,
          message: `Address not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }


      const order = await this.orderModel.create({
        ...dto,
        creatorID: creator.data.user.id
      })

      // meals logic
      const orderDays = await this.orderDaysService.createOrderDay({
        ...dto,
        creatorID: creator.data.user.id,
        orderID: order.id,
        date: order.startDate
      })

      if(!orderDays.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Order days not found`
        );
        // throw new HttpException({
        //   success: false,
        //   message: `Order days not found`,
        //   data: {}
        // }, HttpStatus.BAD_REQUEST);
      }

      await order.$set('manager', [manager.data.user.id])

      await order.$set('customer', [customer.data.customer.id])

      await order.$set('creator', [manager.data.user.id])

      await order.$set('address', [address.data.address.id])

      const newOrder = await this.orderModel.findByPk(order.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Order created successfully',
        data: {
          order: newOrder
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'createOrder()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting orders
  async getOrders(){
    try{
      const orders = await this.orderModel.findAll({
        where: { active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Orders fetched successfully',
        data: {
          orders
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'getOrders()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting an order
  async getOrder(id: number){
    try{
      const order = await this.orderModel.findByPk(id, { include: { all: true } });

      if(!order){
        this.logger.error(
          `Error in orders.service.ts - 'getOrder()'. Order not found`
        );
        throw new HttpException({
          success: false,
          message: `Order not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Order fetched successfully',
        data: {
          order
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'getOrder()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Searching an order(s)
  async searchOrders(dto: SearchOrderDto){
    try{
      const orders = await this.orderModel.findAll({
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

      return {
        success: true,
        message: 'Orders searched successfully',
        data: {
          orders
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'searchOrders()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing an order
  async modifyOrder(id: number, dto: UpdateOrderDto){
    try{
      const order = await this.orderModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in orders.service.ts - 'modifyOrder()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!order){
        this.logger.error(
          `Error in orders.service.ts - 'modifyOrder()'. Order not found`
        );
        throw new HttpException({
          success: false,
          message: `Order not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newOrder = await this.orderModel.findByPk(order.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Orders modified successfully',
        data: {
          order: newOrder
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'modifyOrder()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing an order
  async removeOrder(id: number){
    try{
      const order = await this.orderModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in orders.service.ts - 'removeOrder()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!order){
        this.logger.error(
          `Error in orders.service.ts - 'removeOrder()'. Order not found`
        );
        throw new HttpException({
          success: false,
          message: `Order not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newOrder = await this.orderModel.findByPk(order.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Orders removed successfully',
        data: {
          order: newOrder
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'removeOrder()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
