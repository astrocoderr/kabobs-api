import {
  Body, Controller, Delete, Get, Param,
  Post, Put, Query, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';
import { KitchenUsersService } from '../services/kitchen-users.service';
import { KitchenUser } from '../models/kitchen-users.model';
import { CreateKitchenUserDto } from '../dto/create-kitchen-user.dto';
import { UpdateKitchenUserDto } from '../dto/update-kitchen-user.dto';
import { GetKitchenUsersDto } from '../dto/get-kitchen-users.dto';


@ApiTags('Kitchen Users')
@UseGuards(JwtAuthGuard)
@Controller('kitchen-users')
export class KitchenUsersController {
  constructor(private kitchenUserService: KitchenUsersService) {}

  // Kitchen User CRUD
  @ApiOperation({ summary: 'Creating a kitchens user' })
  @ApiResponse({ status: 200, type: KitchenUser })
  @Post()
  createKitchenUser(@Body()  dto: CreateKitchenUserDto){
    return this.kitchenUserService.createKitchenUser(dto)
  }

  @ApiOperation({ summary: 'Getting a kitchens user' })
  @ApiResponse({ status: 200, type: KitchenUser })
  @Get('/:id')
  getKitchenUser(@Param('id') id: number){
    return this.kitchenUserService.getKitchenUser(id)
  }

  @ApiOperation({ summary: 'Getting kitchens users' })
  @ApiResponse({ status: 200, type: [KitchenUser] })
  @Get()
  getKitchenUsers(@Query() dto: GetKitchenUsersDto){
    return this.kitchenUserService.getKitchenUsers(dto)
  }

  @ApiOperation({ summary: 'Modifying a kitchens user' })
  @ApiResponse({ status: 200, type: KitchenUser })
  @Put('/:id')
  modifyKitchenUser(@Param('id') id: number, @Body() dto: UpdateKitchenUserDto){
    return this.kitchenUserService.modifyKitchenUser(id, dto)
  }

  @ApiOperation({ summary: 'Removing a kitchens user' })
  @ApiResponse({ status: 200, type: KitchenUser })
  @Delete('/:id')
  removeKitchenUser(@Param('id') id: number){
    return this.kitchenUserService.removeKitchenUser(id)
  }
}
