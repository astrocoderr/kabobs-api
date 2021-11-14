import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDTO } from "../dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../models/user.model";
import { UpdateUserDto } from "../dto/update-user.dto";
import { BanUserDto } from "../dto/ban-user.dto";
import { AddRoleUserDto } from "../dto/add-role-user.dto";
import { UnbanUserDto } from "../dto/unban-user.dto";

@ApiTags('Employees' )
@Controller('/v1/users')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  // Extra Links
  @ApiOperation({ summary: 'Adding employee roles' })
  @ApiResponse({ status: 200, type: User })
  @Post('/roles')
  addRole(@Body() dto: AddRoleUserDto){
    return this.userService.addRole(dto)
  }

  @ApiOperation({ summary: 'Removing employee roles' })
  @ApiResponse({ status: 200, type: User })
  @Delete('/:id/roles/:roleID')
  removeRole(@Param('id') id: number, @Param('roleID') roleID: number){
    return this.userService.removeRole(id, roleID)
  }

  @ApiOperation({ summary: 'Banning an employee' })
  @ApiResponse({ status: 200, type: User })
  @Post('/ban')
  ban(@Body() dto: BanUserDto){
    return this.userService.ban(dto)
  }

  @ApiOperation({ summary: 'Getting banned employees' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/ban')
  getBanned(){
    return this.userService.getBanned()
  }

  @ApiOperation({ summary: 'Unbanning an employee' })
  @ApiResponse({ status: 200, type: User })
  @Post('/unban')
  unban(@Body() dto: UnbanUserDto){
    return this.userService.unban(dto)
  }

  // User CRUD
  @ApiOperation({ summary: 'Creating an employee' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createUser(@Body()  dto: CreateUserDTO){
    return this.userService.createUser(dto)
  }

  @ApiOperation({ summary: 'Getting an employee' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  getUser(@Param('id') id: number){
    return this.userService.getUser(id)
  }

  @ApiOperation({ summary: 'Getting employees' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getUsers(){
    return this.userService.getUsers()
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
