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
import { GetOrdersDto } from '../dto/get-orders.dto';


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
      const manager = await this.userService.getUser(dto.manager_id)

      if(!manager.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Manager not found`
        );
        throw new HttpException({
          success: false,
          message: `Manager not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      // customerID
      const customer = await this.customerService.getCustomer(dto.customer_id)

      if(!customer.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      // creatorID
      const creator = await this.userService.getUser(dto.manager_id)

      if(!creator.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Creator not found`
        );
        throw new HttpException({
          success: false,
          message: `Creator not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      let promocode;

      if(dto.promocode_id){
        // promocodeID
        promocode = await this.promocodeService.getPromocode(dto.promocode_id)

        if(!promocode.success){
          this.logger.error(
            `Error in orders.service.ts - 'createOrder()'. Promocode not found`
          );
          throw new HttpException({
            success: false,
            message: `Promocode not found`,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        }
      }

      // addressID
      const address = await this.addressService.getAddress(dto.address_id)

      if(!address.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Address not found`
        );
        throw new HttpException({
          success: false,
          message: `Address not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }


      const order = await this.orderModel.create({
        ...dto,
        creator_id: creator.result.user.id
      })

      // meals logic
      const order_days = await this.orderDaysService.createOrderDay({
        ...dto,
        creator_id: creator.result.user.id,
        order_id: order.id,
        date: order.start_date
      })

      if(!order_days.success){
        this.logger.error(
          `Error in orders.service.ts - 'createOrder()'. Order days not found`
        );
        throw new HttpException({
          success: false,
          message: `Order days not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      await order.$set('manager', [manager.result.user.id])

      await order.$set('customer', [customer.result.customer.id])

      await order.$set('creator', [manager.result.user.id])

      await order.$set('address', [address.result.address.id])

      const new_order = await this.orderModel.findByPk(order.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Order created successfully',
        result: {
          order: new_order
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'createOrder()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting orders
  async getOrders(dto: GetOrdersDto){
    try{
      const orders = await this.orderModel.findAndCountAll({
        where: { active: true },
        include: { all: true },
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit
      });

      return {
        success: true,
        message: 'Orders fetched successfully',
        result: {
          orders
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'getOrders()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
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
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Order fetched successfully',
        result: {
          order
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'getOrder()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Searching an order(s)
  async searchOrders(dto: SearchOrderDto){
    try{
      const orders = await this.orderModel.findAll({
        where: {
          [Op.or]: [
            // { customer_id: dto.search },
            // { manager_id: dto.search },
            // { creator_id: dto.search },
            // { promocode_id: dto.search },
            // { kcal: dto.search },
            // { prot: dto.search },
            // { fat: dto.search },
            // { carb: dto.search },
            // { price: dto.search },
            { kitchen_comment: dto.search },
            { delivery_comment: dto.search }
          ]
        },
        include: { all: true }
      })

      return {
        success: true,
        message: 'Orders searched successfully',
        result: {
          orders
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'searchOrders()'. ${ex.message}. ${ex.original}`
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
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!order){
        this.logger.error(
          `Error in orders.service.ts - 'modifyOrder()'. Order not found`
        );
        throw new HttpException({
          success: false,
          message: `Order not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_order = await this.orderModel.findByPk(order.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Orders modified successfully',
        result: {
          order: new_order
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'modifyOrder()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
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
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!order){
        this.logger.error(
          `Error in orders.service.ts - 'removeOrder()'. Order not found`
        );
        throw new HttpException({
          success: false,
          message: `Order not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_order = await this.orderModel.findByPk(order.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Orders removed successfully',
        result: {
          order: new_order
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in orders.service.ts - 'removeOrder()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
