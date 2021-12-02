import {
  Body, Controller, Delete, Get, Param,
  Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CustomersService } from '../services/customers.service';
import { BanCustomerDto } from '../dto/ban-customer.dto';
import { UnbanCustomerDto } from '../dto/unban-customer.dto';
import { Customer } from '../models/customer.model';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';


@ApiTags('Customers')
@UseGuards(JwtAuthGuard)
@Controller('/customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  // Extra Links
  @ApiOperation({ summary: 'Banning a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Post('/ban')
  ban(@Body() dto: BanCustomerDto){
    return this.customerService.ban(dto)
  }

  @ApiOperation({ summary: 'Getting banned customers' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get('/ban')
  getBanned(){
    return this.customerService.getBanned()
  }

  @ApiOperation({ summary: 'Unbanning a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Post('/unban')
  unban(@Body() dto: UnbanCustomerDto){
    return this.customerService.unban(dto)
  }

  // Customer CRUD
  @ApiOperation({ summary: 'Creating a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Post()
  createUser(@Body()  dto: CreateCustomerDto){
    return this.customerService.createCustomer(dto)
  }

  @ApiOperation({ summary: 'Getting a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Get('/:id')
  getUser(@Param('id') id: number){
    return this.customerService.getCustomer(id)
  }

  @ApiOperation({ summary: 'Getting customers' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get()
  getUsers(){
    return this.customerService.getCustomers()
  }

  @ApiOperation({ summary: 'Modifying a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Put('/:id')
  modifyUser(@Param('id') id: number, @Body() dto: UpdateCustomerDto){
    return this.customerService.modifyCustomer(id, dto)
  }

  @ApiOperation({ summary: 'Removing a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Delete('/:id')
  removeUser(@Param('id') id: number){
    return this.customerService.removeCustomer(id)
  }
}
