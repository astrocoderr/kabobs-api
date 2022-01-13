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


@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer) private customerModel: typeof Customer,
    private addressService: AddressesService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a customer
  async createCustomer(dto: CreateCustomerDto){
    try{
      const address = await this.addressService.getAddress(dto.address)

      if(!address.success){
        this.logger.error(`Error in customers.service.ts - 'createCustomer()'. Address not found`);
        throw new HttpException({
          success: false,
          message: `Address not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const customer = await this.customerModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT')),
        status: true
      })

      await customer.$set('address', [address.data.address.id])

      const newCustomer = await this.customerModel.findByPk(customer.id, { include: { all: true } })

      return {
        success: true,
        message: 'Customer created successfully',
        data: {
          customer: newCustomer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'createCustomer()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting customers
  async getCustomers(){
    try{
      const customers = await this.customerModel.findAll({
        where: { active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Customers fetched successfully',
        data: {
          customers
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'getCustomers()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Searching customers
  async searchCustomers(dto: SearchCustomerDto){
    try{
      const customers = await this.customerModel.findAll({
        where: {
          [Op.or]: [
            { firstName: dto.search },
            { lastName: dto.search },
            { phone: dto.search },
            { additionalPhone: dto.search },
            { factorID: dto.search },
            { kitchenID: dto.search },
            { language: dto.search },
            { userID: dto.search },
            { active: true }
          ]
        },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Customers fetched successfully',
        data: {
          customers
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'searchCustomers()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Customer fetched successfully',
        data: {
          customer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'getCustomer()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'modifyCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      if(dto.password) {
        customer.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

        await customer.save()
      }

      const newCustomer = await this.customerModel.findByPk(customer.id, { include: { all: true } })

      return {
        success: true,
        message: 'Customer modified successfully',
        data: {
          customer: newCustomer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'modifyCustomer()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'removeCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Customer removed successfully',
        data: {
          customer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'removeCustomer()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }


  // Banning a customer
  async banCustomer(dto: BanCustomerDto){
    try{
      const customer = await this.customerModel.findByPk(dto.customerID)

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'banCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      customer.banned = true
      customer.banReason = dto.banReason
      customer.unbanReason = null
      await customer.save()

      const newCustomer = await this.customerModel.findByPk(customer.id, { include: { all: true } })

      return {
        success: true,
        message: 'Customer banned successfully',
        data: {
          customer: newCustomer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'banCustomer()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Unbanning a customer
  async unbanCustomer(dto: UnbanCustomerDto){
    try{
      const customer = await this.customerModel.findByPk(dto.customerID)

      if(!customer){
        this.logger.error(
          `Error in customers.service.ts - 'unbanCustomer()'. Customer not found`
        );
        throw new HttpException({
          success: false,
          message: `Customer not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      customer.banned = false
      customer.banReason = null
      customer.unbanReason = dto.unbanReason
      await customer.save()

      const newCustomer = await this.customerModel.findByPk(customer.id, { include: { all: true } })

      return {
        success: true,
        message: 'Customer unbanned successfully',
        data: {
          customer: newCustomer
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'unbanCustomer()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
        data: {
          customers
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in customers.service.ts - 'getBannedCustomers()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
