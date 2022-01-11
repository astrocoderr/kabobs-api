import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

import { Customer } from '../models/customers.model';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { BanCustomerDto } from '../dto/ban-customer.dto';
import { UnbanCustomerDto } from '../dto/unban-customer.dto';
import { AddressesService } from '../../addresses/services/addresses.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { SearchCustomerDto } from '../dto/search-customer.dto';
import { Op } from 'sequelize';

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
      const customer = await this.customerModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT')),
        status: true
      })

      const address = await this.addressService.getAddress(dto.address)

      if(address.success){
        await customer.$set('address', [address.data.address.id])
      }else{
        this.logger.error(`Error in customers.service.ts - 'address' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      return await this.customerModel.findByPk(customer.id, { include: { all: true } })
    }catch(ex){
      this.logger.error(`Error in customers.service.ts - '${ex}'`);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting customers
  async getCustomers(){
    return await this.customerModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Searching customers
  async searchCustomers(dto: SearchCustomerDto){
    return await this.customerModel.findAll({
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
  }

  // Getting a customer
  async getCustomer(id: number){
    return await this.customerModel.findByPk(id, { include: { all: true } });
  }

  // Editing a customer
  async modifyCustomer(id: number, dto: UpdateCustomerDto){
    const customer = await this.customerModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in customers.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!customer){
      this.logger.error(`Error in customers.service.ts - 'customer' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    if(dto.password){
      customer.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

      await customer.save()
    }



    return await this.customerModel.findByPk(customer.id, { include: { all: true } })
  }

  // Removing a customer
  async removeCustomer(id: number){
    const customer = await this.customerModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in customers.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!customer){
      this.logger.error(`Error in customers.service.ts - 'customer' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return customer
  }


  // Banning a customer
  async ban(dto: BanCustomerDto){
    const customer = await this.customerModel.findByPk(dto.customerID)

    if(!customer){
      this.logger.error(`Error in customers.service.ts - 'customer' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    customer.banned = true
    customer.banReason = dto.banReason
    customer.unbanReason = null
    await customer.save()

    return await this.customerModel.findByPk(customer.id, { include: { all: true } })
  }

  // Unbanning a customer
  async unban(dto: UnbanCustomerDto){
    const customer = await this.customerModel.findByPk(dto.customerID)

    if(!customer){
      this.logger.error(`Error in customers.service.ts - 'customer' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    customer.banned = false
    customer.banReason = null
    customer.unbanReason = dto.unbanReason
    await customer.save()

    return await this.customerModel.findByPk(customer.id, { include: { all: true } })
  }

  // Getting banned customers
  async getBanned(){
    return await this.customerModel.findAll({
      where: { banned: true, active: true },
      include: { all: true }
    });
  }
}
