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
      const user = await this.userModel.create({
        ...dto,
        password: await bcrypt.hash(dto.password, this.configService.get('BCRYPT_SALT'))
      })

      const role = await this.roleService.getRole(dto.role)

      if(role){
        await user.$set('role', [role])
      }else{
        this.logger.error(`Error in users.service.ts - 'role' is not found`)
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      return await this.userModel.findByPk(user.id, { include: { all: true } })
    }catch(ex){
      this.logger.error(`Error in users.service.ts - '${ex}'`)
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting users
  async getUsers(){
    return await this.userModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Searching user(s)
  async searchUsers(dto: SearchUserDto){
    return await this.userModel.findAll({
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
        this.logger.error(`Error in users.service.ts - '${error}'`)
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!user){
      this.logger.error(`Error in users.service.ts - 'user' is not found`)
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
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
        this.logger.error(`Error in users.service.ts - 'role' is not found`)
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
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
      .catch(error => {
        this.logger.error(`Error in users.service.ts - '${error}'`)
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!user){
      this.logger.error(`Error in users.service.ts - 'user' is not found`)
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return user
  }


  // Adding user roles
  async addRole(dto: AddRoleUserDto){
    const user = await this.userModel.findByPk(dto.userID)

    if(!user){
      this.logger.error(`Error in users.service.ts - 'user' is not found`)
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    const role = await this.roleService.getRole(dto.roleID)

    if(!role){
      this.logger.error(`Error in users.service.ts - 'role' is not found`)
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    await user.$add('role', role.id)

    return await this.userModel.findByPk(user.id, { include: { all: true } })
  }

  // Removing user roles
  async removeRole(id, roleID){
    const user = await this.userModel.findByPk(id)

    if(!user){
      this.logger.error(`Error in users.service.ts - 'user' is not found`)
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    const role = await this.roleService.getRole(roleID)

    if(!role){
      this.logger.error(`Error in users.service.ts - 'role' is not found`)
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    await user.$remove('role', role.id)

    return await this.userModel.findByPk(user.id, { include: { all: true } })
  }


  // Banning a user
  async ban(dto: BanUserDto){
    const user = await this.userModel.findByPk(dto.userID)

    if(!user){
      this.logger.error(`Error in users.service.ts - 'user' is not found`)
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
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
      this.logger.error(`Error in users.service.ts - 'user' is not found`)
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
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
