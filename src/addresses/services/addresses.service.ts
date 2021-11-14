import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Addresses } from "../models/addresses.model";
import { CreateAddressDto } from "../dto/create-address.dto";

@Injectable()
export class AddressesService {
  constructor(@InjectModel(Addresses) private addressModel: typeof Addresses) {}

  async createAddress(dto: CreateAddressDto){
    return await this.addressModel.create(dto);
  }

  async getAddresses(){
    return await this.addressModel.findAll({ where: { active: true } })
  }

  async getAddress(id: number){
    return await this.addressModel.findOne({ where: { id } })
  }

  async removeAddress(id: number){
    const address = await this.addressModel.update({ active: false }, {
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => { /* logging */})

    if(!address){
      // throw Error
      return
    }

    return address
  }
}
