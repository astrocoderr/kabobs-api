import {
  Body, Controller, Delete, Get, Inject, Param,
  Post, Put, Query, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../models/user.model';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BanUserDto } from '../dto/ban-user.dto';
import { AddRoleUserDto } from '../dto/add-role-user.dto';
import { UnbanUserDto } from '../dto/unban-user.dto';
import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { SearchUserDto } from '../dto/search-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { GetUsersDto } from '../dto/get-users.dto';


@ApiTags('Employees')
@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UsersController {
  constructor(
    private userService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Extra Links
  @ApiOperation({ summary: 'Adding employee roles' })
  @ApiResponse({ status: 200, type: User })
  @Post('/roles')
  addRole(@Body() dto: AddRoleUserDto){
    return this.userService.addUserRole(dto)
  }

  @ApiOperation({ summary: 'Removing employee roles' })
  @ApiResponse({ status: 200, type: User })
  @Delete('/:id/roles/:roleID')
  removeRole(@Param('id') id: number, @Param('roleID') roleID: number){
    return this.userService.subtractUserRole(id, roleID)
  }

  @ApiOperation({ summary: 'Banning an employee' })
  @ApiResponse({ status: 200, type: User })
  @Post('/ban')
  ban(@Body() dto: BanUserDto){
    return this.userService.banUser(dto)
  }

  @ApiOperation({ summary: 'Getting banned employees' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/ban')
  getBanned(){
    return this.userService.getBannedUsers()
  }

  @ApiOperation({ summary: 'Unbanning an employee' })
  @ApiResponse({ status: 200, type: User })
  @Post('/unban')
  unban(@Body() dto: UnbanUserDto){
    return this.userService.unbanUser(dto)
  }

  // User CRUD
  @ApiOperation({ summary: 'Creating an employee' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createUser(@Body()  dto: CreateUserDTO){
    return this.userService.createUser(dto)
  }

  @ApiOperation({ summary: "Searching employees by 'firstName', " +
      "'lastName', 'email', 'branchID', 'bitrixID'"
  })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin')
  @Get()
  searchUsers(@Query() search: SearchUserDto){
    return this.userService.searchUsers(search)
  }


  @ApiOperation({ summary: 'Getting an employee' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  getUser(@Param('id') id: number){
    return this.userService.getUser(id)
  }

  @ApiOperation({ summary: 'Getting employees' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin')
  @Get()
  getUsers(@Query() dto: GetUsersDto){
    return this.userService.getUsers(dto)
  }



  @ApiOperation({ summary: 'Modifying an employee' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:id')
  modifyUser(@Param('id') id: number, @Body() dto: UpdateUserDto){
    return this.userService.modifyUser(id, dto)
  }

  @ApiOperation({ summary: 'Removing an employee' })
  @ApiResponse({ status: 200, type: User })
  @Delete('/:id')
  removeUser(@Param('id') id: number){
    return this.userService.removeUser(id)
  }
}
