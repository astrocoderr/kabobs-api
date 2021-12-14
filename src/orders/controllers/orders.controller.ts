import {
  Body, Controller, Delete, Get, Param, Post, Put,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import { Order } from '../models/orders.model';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';


@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  // Order CRUD
  @ApiOperation({ summary: 'Creating an orders' })
  @ApiResponse({ status: 200, type: Order })
  @Post()
  createUser(@Body()  dto: CreateOrderDto){
    return this.orderService.createOrder(dto)
  }

  @ApiOperation({ summary: 'Getting an orders' })
  @ApiResponse({ status: 200, type: Order })
  @Get('/:id')
  getUser(@Param('id') id: number){
    return this.orderService.getOrder(id)
  }

  @ApiOperation({ summary: 'Getting orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  getUsers(){
    return this.orderService.getOrders()
  }

  @ApiOperation({ summary: 'Modifying an orders' })
  @ApiResponse({ status: 200, type: Order })
  @Put('/:id')
  modifyUser(@Param('id') id: number, @Body() dto: UpdateOrderDto){
    return this.orderService.modifyOrder(id, dto)
  }

  @ApiOperation({ summary: 'Removing an orders' })
  @ApiResponse({ status: 200, type: Order })
  @Delete('/:id')
  removeUser(@Param('id') id: number){
    return this.orderService.removeOrder(id)
  }
}
