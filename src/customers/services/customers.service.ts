import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Customer } from '../models/customers.model';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { BanCustomerDto } from '../dto/ban-customer.dto';
import { UnbanCustomerDto } from '../dto/unban-customer.dto';
import { AddressesService } from '../../addresses/services/addresses.service';
import { SearchCustomerDto } from '../dto/search-customer.dto';
import { GetCustomersDto } from '../dto/get-customers.dto';
import { UsersService } from '../../users/services/users.service';


@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer) private customerModel: typeof Customer,
    private addressService: AddressesService,
    private userService: UsersService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a customer
  async createCustomer(dto: CreateCustomerDto){
    try{
      const address = await this.addressService.getAddress(dto.address_id)

      if(!address.success){
        this.logger.error(`Error in customers.service.ts - 'createCustomer()'. Address not found`);
        throw new HttpException({
          success: false,
          message: `Address not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const manager = await this.userService.getUser(dto.manager_id)

      if(!manager.success){
        this.logger.error(`Error in customers.service.ts - 'createCustomer()'. Manager not found`);
        throw new HttpException({
          success: false,
          message: `Manager not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const customer = await this.customerModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT')),
        status: true
      })

      await customer.$set('address', [address.result.address.id])

      await customer.$set('manager', [manager.result.user.id])

      const new_customer = await this.customerModel.findByPk(customer.id, { include: { all: true } })

      return {
        success: true,
        message: 'Customer created successfully',
        result: {
          customer: new_customer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'createCustomer()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting customers
  async getCustomers(dto: GetCustomersDto){
    try{
      const customers = await this.customerModel.findAndCountAll({
        where: { active: true },
        include: { all: true },
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit
      });

      return {
        success: true,
        message: 'Customers fetched successfully',
        result: {
          customers
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'getCustomers()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Searching customers
  async searchCustomers(dto: SearchCustomerDto){
    try{
      const customers = await this.customerModel.findAll({
        where: {
          [Op.or]: {
            first_name: { [Op.substring]: dto.search },
            last_name: { [Op.substring]: dto.search },
            phone: { [Op.substring]: dto.search },
            additional_phone: { [Op.substring]: dto.search },
            email: { [Op.substring]: dto.search }
          },
          active: true,
        },
        order: [['id', dto.sort.toUpperCase()]],
        include: { all: true }
      });


    // { last_name: dto.search },
    // { phone: dto.search },
    // { additional_phone: dto.search },
    // { language: dto.search },

      return {
        success: true,
        message: 'Customers fetched successfully',
        result: {
          customers
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'searchCustomers()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a customer
  async getCustomer(id: number){
    try{
      const customer = await this.customerModel.findByPk(id, { include: { all: true } });

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'getCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Customer fetched successfully',
        result: {
          customer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'getCustomer()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a customer
  async modifyCustomer(id: number, dto: UpdateCustomerDto){
    try{
      const customer = await this.customerModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in customers.service.ts - 'modifyCustomer()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'modifyCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      if(dto.password) {
        customer.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

        await customer.save()
      }

      if(dto.address_id){
        const address = await this.addressService.getAddress(dto.address_id)

        if(!address.success){
          this.logger.error(`Error in customers.service.ts - 'createCustomer()'. Address not found`);
          throw new HttpException({
            success: false,
            message: `Address not found`,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        }

        await customer.$set('address', [address.result.address.id])
      }

      const new_customer = await this.customerModel.findByPk(customer.id, { include: { all: true } })

      return {
        success: true,
        message: 'Customer modified successfully',
        result: {
          customer: new_customer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'modifyCustomer()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a customer
  async removeCustomer(id: number){
    try{
      const customer = await this.customerModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in customers.service.ts - 'removeCustomer()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'removeCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Customer removed successfully',
        result: {
          customer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'removeCustomer()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }


  // Banning a customer
  async banCustomer(dto: BanCustomerDto){
    try{
      const customer = await this.customerModel.findByPk(dto.customer_id)

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'banCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      customer.banned = true
      customer.ban_reason = dto.ban_reason
      customer.unban_reason = null
      await customer.save()

      const new_customer = await this.customerModel.findByPk(customer.id, { include: { all: true } })

      return {
        success: true,
        message: 'Customer banned successfully',
        result: {
          customer: new_customer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'banCustomer()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Unbanning a customer
  async unbanCustomer(dto: UnbanCustomerDto){
    try{
      const customer = await this.customerModel.findByPk(dto.customer_id)

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'unbanCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      customer.banned = false
      customer.ban_reason = null
      customer.unban_reason = dto.unban_reason
      await customer.save()

      const new_customer = await this.customerModel.findByPk(customer.id, { include: { all: true } })

      return {
        success: true,
        message: 'Customer unbanned successfully',
        result: {
          customer: new_customer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'unbanCustomer()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting banned customers
  async getBannedCustomers(){
    try{
      const customers = await this.customerModel.findAll({
        where: { banned: true, active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Banned customers fetched successfully',
        result: {
          customers
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'getBannedCustomers()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
