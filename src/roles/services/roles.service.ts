import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async createRole(dto: CreateRoleDto){
    return await this.roleModel.create(dto);
  }

  async getRoles(){
    return await this.roleModel.findAll({ where: { active: true } })
  }

  async getRole(id: number){
    return await this.roleModel.findOne({ where: { id } })
  }

  async removeRole(id: number){
    const role = await this.roleModel.update({ active: false }, {
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => { /* logging */})

    if(!role){
      // throw Error
      return
    }

    return role
  }
}
