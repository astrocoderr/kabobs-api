import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../models/roles.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

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
      .catch(error => {
        this.logger.error(`Error in roles.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!role){
      this.logger.error(`Error in roles.service.ts - 'role' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return role
  }
}
