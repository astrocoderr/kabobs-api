import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as fs from 'fs';
const util = require('util');

import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';


const open = util.promisify(fs.open)
const close = util.promisify(fs.close)
const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)


@Injectable()
export class PermissionsService {
  private file_name: string = this.configService.get('PERMISSIONS.FILE_PATH')

  constructor(
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a permission
  async createPermission(dto: CreatePermissionDto){
    const name = dto.name.toUpperCase()

    const permission = {
      [name]: {
        "CREATE": dto.create,
        "READ": dto.read,
        "UPDATE": dto.update,
        "DELETE": dto.delete,
        "UPLOAD": dto.upload,
        "DOWNLOAD": dto.download
      }
    }

    try{
      await open(this.file_name, 'r')
    }catch(ex){
      return write(this.file_name, JSON.stringify(permission));
    }

    try{
      const read_file = await read(this.file_name, 'utf8')

      if(JSON.parse(read_file)[name]){
        this.logger.error(
          `Error in permissions.service.ts - 'createPermission()'. Permission already exists`
        );
        throw new HttpException({
          success: false,
          message: `Permission already exists`,
          result: {}
        }, HttpStatus.BAD_GATEWAY);
      }

      await write(this.file_name, JSON.stringify({ ...JSON.parse(read_file), ...permission }));

      return {
        success: true,
        message: 'Permission created successfully',
        result: {
          permission
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in permissions.service.ts - 'createPermission()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting permissions
  async getPermissions(){
    try{
      const permissions = JSON.parse(await read(this.file_name, 'utf8'))

      return {
        success: true,
        message: 'Permissions fetched successfully',
        result: {
          permissions
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in permissions.service.ts - 'getPermissions()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a permission
  async getPermission(name: string){
    try{
      const read_file = await read(this.file_name, 'utf8')

      const permissions = JSON.parse(read_file)

      if(!permissions[name]){
        this.logger.error(
          `Error in permissions.service.ts - 'getPermission()'. Permission not found`
        );
        throw new HttpException({
          success: false,
          message: `Permission not found`,
          result: {}
        }, HttpStatus.BAD_GATEWAY);
      }

      const permission = {
        [name]: permissions[name]
      }

      return {
        success: true,
        message: 'Permission fetched successfully',
        result: {
          permission
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in permissions.service.ts - 'getPermission()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a permission
  async modifyPermission(name: string, dto: UpdatePermissionDto){
    try{
      const read_file = await read(this.file_name, 'utf8')

      const permissions = JSON.parse(read_file)

      if(!permissions[name]){
        this.logger.error(
          `Error in permissions.service.ts - 'getPermission()'. Permission not found`
        );
        throw new HttpException({
          success: false,
          message: `Permission not found`,
          result: {}
        }, HttpStatus.BAD_GATEWAY);
      }

      permissions[name] = {
        "CREATE": dto.create,
        "READ": dto.read,
        "UPDATE": dto.update,
        "DELETE": dto.delete,
        "UPLOAD": dto.upload,
        "DOWNLOAD": dto.download
      }

      await write(this.file_name, JSON.stringify(permissions));

      const permission = {
        [name]: permissions[name]
      }

      return {
        success: true,
        message: 'Permission modified successfully',
        result: {
          permission
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in permissions.service.ts - 'modifyPermission()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a permission
  async removePermission(name: string){
    try{
      const read_file = await read(this.file_name, 'utf8')

      const permissions = JSON.parse(read_file)

      if(!permissions[name]){
        this.logger.error(
          `Error in permissions.service.ts - 'getPermission()'. Permission not found`
        );
        throw new HttpException({
          success: false,
          message: `Permission not found`,
          result: {}
        }, HttpStatus.BAD_GATEWAY);
      }

      const permission = {
        [name]: permissions[name]
      }

      delete permissions[name]

      await write(this.file_name, JSON.stringify(permissions));

      return {
        success: true,
        message: 'Permission removed successfully',
        result: {
          permission
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in permissions.service.ts - 'removePermission()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
