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
      const role = await this.roleService.getRole(dto.role)

      if(!role.success){
        this.logger.error(
          `Error in users.service.ts - 'createUser()'. Role not found`
        );
        throw new HttpException({
          success: false,
          message: `Role not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const user = await this.userModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))
      })

      await user.$set('role', [role.data.role.id])

      const newUser = await this.userModel.findByPk(user.id,
        { include: { all: true }
      })

      return {
        success: true,
        message: 'User created successfully',
        data: {
          user: newUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'createUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting users
  async getUsers(){
    try{
      const users = await this.userModel.findAll({
        where: { active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Users fetched successfully',
        data: {
          users
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'getUsers()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'User fetched successfully',
        data: {
          user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'getUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Searching user(s)
  async searchUsers(dto: SearchUserDto){
    try{
      const users = await this.userModel.findAll({
        where: {
          [Op.or]: [
            { firstName: dto.search },
            { lastName: dto.search },
            { email: dto.search },
            { branchID: dto.search },
            { bitrixID: dto.search }
          ]
        },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Users searched successfully',
        data: {
          users
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'searchUsers()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'User fetched successfully',
        data: {
          user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'getUserByEmail()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'modifyUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      if(dto.password){
        user.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

        await user.save()
      }

      if(dto.role){
        const role = await this.roleService.getRole(dto.role)

        if(!role.success){
          this.logger.error(
            `Error in users.service.ts - 'modifyUser()'. Role not found`
          );
          throw new HttpException({
            success: false,
            message: `Role not found`,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        }

        await user.$set('role', [role.data.role.id])
      }

      const newUser = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User modified successfully',
        data: {
          user: newUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'modifyUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'removeUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newUser = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User removed successfully',
        data: {
          user: newUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'removeUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }


  // Adding user roles
  async addUserRole(dto: AddRoleUserDto){
    try{
      const user = await this.userModel.findByPk(dto.userID)

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'addUserRole()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const role = await this.roleService.getRole(dto.roleID)

      if(!role.success){
        this.logger.error(
          `Error in users.service.ts - 'addUserRole()'. Role not found`
        );
        throw new HttpException({
          success: false,
          message: `Role not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      await user.$add('role', role.data.role.id)

      const newUser = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User role added successfully',
        data: {
          user: newUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'addUserRole()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing user roles
  async subtractUserRole(id, roleID){
    try{
      const user = await this.userModel.findByPk(id)

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'subtractUserRole()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const role = await this.roleService.getRole(roleID)

      if(!role){
        this.logger.error(
          `Error in users.service.ts - 'subtractUserRole()'. Role not found`
        );
        throw new HttpException({
          success: false,
          message: `Role not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      await user.$remove('role', role.data.role.id)

      const newUser = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User role subtracted successfully',
        data: {
          user: newUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'subtractUserRole()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }


  // Banning a user
  async banUser(dto: BanUserDto){
    try{
      const user = await this.userModel.findByPk(dto.userID)

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'banUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      user.banned = true
      user.banReason = dto.banReason
      user.unbanReason = null
      await user.save()

      const newUser = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User banned successfully',
        data: {
          user: newUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'banUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Unbanning a user
  async unbanUser(dto: UnbanUserDto){
    try{
      const user = await this.userModel.findByPk(dto.userID)

      if(!user){
        this.logger.error(
          `Error in users.service.ts - 'unbanUser()'. User not found`
        );
        throw new HttpException({
          success: false,
          message: `User not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      user.banned = false
      user.banReason = null
      user.unbanReason = dto.unbanReason
      await user.save()

      const newUser = await this.userModel.findByPk(user.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'User unbanned successfully',
        data: {
          user: newUser
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'unbanUser()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
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
        data: {
          users
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in users.service.ts - 'getBannedUsers()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
