import {
  HttpException, HttpStatus,
  Inject, Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { User } from '../models/user.model';
import { CreateUserDTO } from '../dto/create-user.dto';
import { RolesService } from '../../roles/services/roles.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BanUserDto } from '../dto/ban-user.dto';
import { AddRoleUserDto } from '../dto/add-role-user.dto';
import { UnbanUserDto } from '../dto/unban-user.dto';
import { SearchUserDto } from '../dto/search-user.dto';
import { GetUsersDto } from '../dto/get-users.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a user
  async createUser(dto: CreateUserDTO){
    try{
      const role = await this.roleService.getRole(dto.role_id)

      if(!role.success){
        this.logger.error(
          `Error in users.service.ts - 'createUser()'. Role not found`
        );
        throw new HttpException({
          success: false,
          message: `Role not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const user = await this.userModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))
      })

      await user.$set('role', [role.result.role.id])

      const new_user = await this.userModel.findByPk(user.id,
        { include: { all: true }
      })

      return {
        success: true,
        message: 'User created successfully',
        result: {
          user: new_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'createUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting users
  async getUsers(dto: GetUsersDto){
    try{
      const users = await this.userModel.findAll({
        where: { active: true },
        include: { all: true },
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit
      });

      return {
        success: true,
        message: 'Users fetched successfully',
        result: {
          users
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'getUsers()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a user
  async getUser(id: number){
    try{
      const user = await this.userModel.findByPk(id, { include: { all: true } });

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'getUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'User fetched successfully',
        result: {
          user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'getUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Searching user(s)
  async searchUsers(dto: SearchUserDto){
    try{
      const users = await this.userModel.findAll({
        where: {
          [Op.or]: [
            { first_name: dto.search },
            { last_name: dto.search },
            { email: dto.search },
            { branch_id: dto.search },
            { bitrix_id: dto.search }
          ]
        },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Users searched successfully',
        result: {
          users
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'searchUsers()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a user by email
  async getUserByEmail(email: string){
    try{
      const user = await this.userModel.findOne({
        where: { email },
        include: { all: true }
      })

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'getUserByEmail()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'User fetched successfully',
        result: {
          user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'getUserByEmail()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a user
  async modifyUser(id: number, dto: UpdateUserDto){
    try{
      const user = await this.userModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in users.service.ts - 'modifyUser()'. ${error.message}`
          );
          throw new HttpException({
            success: false,
            message: `${error.message}`,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'modifyUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      if(dto.password){
        user.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

        await user.save()
      }

      if(dto.role_id){
        const role = await this.roleService.getRole(dto.role_id)

        if(!role.success){
          this.logger.error(
            `Error in users.service.ts - 'modifyUser()'. Role not found`
          );
          throw new HttpException({
            success: false,
            message: `Role not found`,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        }

        await user.$set('role', [role.result.role.id])
      }

      const new_user = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User modified successfully',
        result: {
          user: new_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'modifyUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a user
  async removeUser(id: number){
    try{
      const user = await this.userModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in users.service.ts - 'removeUser()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'removeUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_user = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User removed successfully',
        result: {
          user: new_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'removeUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }


  // Adding user roles
  async addUserRole(dto: AddRoleUserDto){
    try{
      const user = await this.userModel.findByPk(dto.user_id)

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'addUserRole()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const role = await this.roleService.getRole(dto.role_id)

      if(!role.success){
        this.logger.error(
          `Error in users.service.ts - 'addUserRole()'. Role not found`
        );
        throw new HttpException({
          success: false,
          message: `Role not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      await user.$add('role', role.result.role.id)

      const new_user = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User role added successfully',
        result: {
          user: new_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'addUserRole()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing user roles
  async subtractUserRole(id, role_id){
    try{
      const user = await this.userModel.findByPk(id)

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'subtractUserRole()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const role = await this.roleService.getRole(role_id)

      if(!role){
        this.logger.error(
          `Error in users.service.ts - 'subtractUserRole()'. Role not found`
        );
        throw new HttpException({
          success: false,
          message: `Role not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      await user.$remove('role', role.result.role.id)

      const new_user = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User role subtracted successfully',
        result: {
          user: new_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'subtractUserRole()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }


  // Banning a user
  async banUser(dto: BanUserDto){
    try{
      const user = await this.userModel.findByPk(dto.user_id)

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'banUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      user.banned = true
      user.ban_reason = dto.ban_reason
      user.unban_reason = null
      await user.save()

      const new_user = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User banned successfully',
        result: {
          user: new_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'banUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Unbanning a user
  async unbanUser(dto: UnbanUserDto){
    try{
      const user = await this.userModel.findByPk(dto.user_id)

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'unbanUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      user.banned = false
      user.ban_reason = null
      user.unban_reason = dto.unban_reason
      await user.save()

      const new_user = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User unbanned successfully',
        result: {
          user: new_user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'unbanUser()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting banned users
  async getBannedUsers(){
    try{
      const users = await this.userModel.findAll({
        where: { banned: true, active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Users fetched successfully',
        result: {
          users
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'getBannedUsers()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
