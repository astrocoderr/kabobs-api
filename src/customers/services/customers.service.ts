import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs'

import { Customer } from '../models/customer.model';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { BanCustomerDto } from '../dto/ban-customer.dto';
import { UnbanCustomerDto } from '../dto/unban-customer.dto';
import { AddressesService } from "../../addresses/services/addresses.service";

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer) private customerModel: typeof Customer,
    private addressService: AddressesService
  ) {}

  // Creating a customer
  async createCustomer(dto: CreateCustomerDto){
    try{
      const customer = await this.customerModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, Number(process.env.BCRYPT_SALT)),
        status: true
      })

      const address = await this.addressService.getAddress(dto.address)

      if(address){
        await customer.$set('address', [address.id])
      }else{
        // logging
      }

      return await this.customerModel.findByPk(customer.id, { include: { all: true } })
    }catch(ex){
      throw new Error(ex)
    }
  }

  // Getting customers
  async getCustomers(){
    return await this.customerModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting a customer
  async getCustomer(id: number){
    return await this.customerModel.findByPk(id, { include: { all: true } });
  }

  // Getting a customer by email
  // async getCustomerByEmail(email: string){
  //   return await this.customerModel.findOne({
  //     where: { email },
  //     include: { all: true }
  //   })
  // }

  // Editing a customer
  async modifyCustomer(id: number, dto: UpdateCustomerDto){
    const customer = await this.customerModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => { /* logging */ })

    if(!customer){
      // throw Error
      return
    }

    if(dto.password){
      customer.password = await bcrypt.hash(dto.password, Number(process.env.BCRYPT_SALT))

      await customer.save()
    }



    return await this.customerModel.findByPk(customer.id, { include: { all: true } })
  }

  // Removing a customer
  async removeCustomer(id: number){
    // return await this.customerModel.destroy({ where: { id } })
    //   .then(function(rowDeleted){ // rowDeleted will return number of rows deleted
    //     if(rowDeleted === 1){
    //       return { deleted: true }
    //     }
    //   })
    const customer = await this.customerModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => { /* logging */ })

    if(!customer){
      // throw Error
      return
    }

    return customer
  }


  // Banning a customer
  async ban(dto: BanCustomerDto){
    const customer = await this.customerModel.findByPk(dto.customerID)

    if(!customer){
      throw new HttpException('Customer is not found', HttpStatus.NOT_FOUND)
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
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
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
