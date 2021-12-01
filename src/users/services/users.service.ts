import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
// import { HttpException, HttpStatus } from '@nestjs/common';

import { User } from '../models/user.model';
import { CreateUserDTO } from '../dto/create-user.dto';
import { RolesService } from '../../roles/services/roles.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BanUserDto } from '../dto/ban-user.dto';
import { AddRoleUserDto } from '../dto/add-role-user.dto';
import { UnbanUserDto } from '../dto/unban-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
    private configService: ConfigService
  ) {}

  // Creating a user
  async createUser(dto: CreateUserDTO){
    try{
      const user = await this.userModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))
      })
      const role = await this.roleService.getRole(dto.role)

      if(role){
        await user.$set('role', [role])
      }else{
        // logging
      }

      return await this.userModel.findByPk(user.id, { include: { all: true } })
    }catch(ex){
      throw new Error(ex)
    }
  }

  // Getting users
  async getUsers(){
    return await this.userModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting a user
  async getUser(id: number){
    return await this.userModel.findByPk(id, { include: { all: true } });
  }

  // Getting a user by email
  async getUserByEmail(email: string){
    return await this.userModel.findOne({
      where: { email },
      include: { all: true }
    })
  }

  // Editing a user
  async modifyUser(id: number, dto: UpdateUserDto){
    const user = await this.userModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        // error log
      })

    if(!user){
      return 'hohoh'
    }

    if(dto.password){
      user.password = await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))

      await user.save()
    }

    if(dto.role){
      const role = await this.roleService.getRole(dto.role)

      if(role){
        await user.$set('role', [role])
      }else{
        // logging
      }
    }

    return await this.userModel.findByPk(user.id, { include: { all: true } })
  }

  // Removing a user
  async removeUser(id: number){
    const user = await this.userModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => { /* logging */ })

    if(!user){
      // throw Error
      return
    }

    return user
  }


  // Adding user roles
  async addRole(dto: AddRoleUserDto){
    const user = await this.userModel.findByPk(dto.userID)

    if(!user){
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }

    const role = await this.roleService.getRole(dto.roleID)

    if(!role){
      throw new HttpException('Role is not found', HttpStatus.NOT_FOUND)
    }

    await user.$add('role', role.id)

    return await this.userModel.findByPk(user.id, { include: { all: true } })
  }

  // Removing user roles
  async removeRole(id, roleID){
    const user = await this.userModel.findByPk(id)

    if(!user){
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }

    const role = await this.roleService.getRole(roleID)

    if(!role){
      throw new HttpException('Role is not found', HttpStatus.NOT_FOUND)
    }

    await user.$remove('role', role.id)

    return await this.userModel.findByPk(user.id, { include: { all: true } })
  }


  // Banning a user
  async ban(dto: BanUserDto){
    const user = await this.userModel.findByPk(dto.userID)

    if(!user){
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }

    user.banned = true
    user.banReason = dto.banReason
    user.unbanReason = null
    await user.save()

    return await this.userModel.findByPk(user.id, { include: { all: true } })
  }

  // Unbanning a user
  async unban(dto: UnbanUserDto){
    const user = await this.userModel.findByPk(dto.userID)

    if(!user){
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }

    user.banned = false
    user.banReason = null
    user.unbanReason = dto.unbanReason
    await user.save()

    return await this.userModel.findByPk(user.id, { include: { all: true } })
  }

  // Getting banned users
  async getBanned(){
    return await this.userModel.findAll({
      where: { banned: true, active: true },
      include: { all: true }
    });
  }
}
