import {
  Body, Controller, Delete, Get, Param, Post, Put, Query,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import { Order } from '../models/orders.model';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SearchOrderDto } from '../dto/search-order.dto';
import { GetOrdersDto } from '../dto/get-orders.dto';


@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  // Order CRUD
  @ApiOperation({ summary: 'Creating an order' })
  @ApiResponse({ status: 200, type: Order })
  @Post()
  createOrder(@Body()  dto: CreateOrderDto){
    return this.orderService.createOrder(dto)
  }

  @ApiOperation({ summary: 'Getting orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  getOrders(@Query() dto: GetOrdersDto){
    return this.orderService.getOrders(dto)
  }

  @ApiOperation({ summary:
      "Search order by 'customerID', 'userID', 'creatorID', 'promocodeID', " +
      "'kcal', 'prot', 'fat', 'carb', 'price', 'kitchenComment', 'deliveryComment'"
  })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('/search')
  searchOrders(@Query() search: SearchOrderDto){
    return this.orderService.searchOrders(search)
  }

  @ApiOperation({ summary: 'Getting an order' })
  @ApiResponse({ status: 200, type: Order })
  @Get('/:id')
  getOrder(@Param('id') id: number){
    return this.orderService.getOrder(id)
  }

  @ApiOperation({ summary: 'Modifying an order' })
  @ApiResponse({ status: 200, type: Order })
  @Put('/:id')
  modifyOrder(@Param('id') id: number, @Body() dto: UpdateOrderDto){
    return this.orderService.modifyOrder(id, dto)
  }

  @ApiOperation({ summary: 'Removing an order' })
  @ApiResponse({ status: 200, type: Order })
  @Delete('/:id')
  removeOrder(@Param('id') id: number){
    return this.orderService.removeOrder(id)
  }
}
