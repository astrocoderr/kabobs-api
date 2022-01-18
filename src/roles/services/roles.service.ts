import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../models/roles.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { GetRolesDto } from '../dto/get-roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async createRole(dto: CreateRoleDto){
    try{
      const role = await this.roleModel.create(dto);

      return {
        success: true,
        message: 'Role created successfully',
        result: {
          role
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in roles.service.ts - 'createRole()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  async getRoles(dto: GetRolesDto){
    try{
      const roles = await this.roleModel.findAll({
        where: { active: true },
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit
      })

      return {
        success: true,
        message: 'Roles fetched successfully',
        result: {
          roles
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in roles.service.ts - 'getRoles()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  async getRole(id: number){
    try{
      const role = await this.roleModel.findOne({ where: { id } })

      if(!role){
        this.logger.error(
          `Error in roles.service.ts - 'getRole()'. Role not found`
        );
        throw new HttpException({
          success: false,
          message: `Role not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Role fetched successfully',
        result: {
          role
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in roles.service.ts - 'getRole()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  async removeRole(id: number){
    try{
      const role = await this.roleModel.update({ active: false }, {
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in roles.service.ts - 'removeRole()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!role){
        this.logger.error(
          `Error in roles.service.ts - 'removeRole()'. Role not found`
        );
        throw new HttpException({
          success: false,
          message: `Role not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Role removed successfully',
        result: {
          role
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in roles.service.ts - 'removeRole()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
