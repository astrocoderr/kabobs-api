import {
  Body, Controller, Delete, Get, Param,
  Post, Put, Query, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CustomersService } from '../services/customers.service';
import { BanCustomerDto } from '../dto/ban-customer.dto';
import { UnbanCustomerDto } from '../dto/unban-customer.dto';
import { Customer } from '../models/customers.model';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';
import { SearchCustomerDto } from '../dto/search-customer.dto';
import { GetCustomersDto } from '../dto/get-customers.dto';


@ApiTags('Customers')
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  // Extra Links
  @ApiOperation({ summary: 'Banning a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Post('/ban')
  banCustomer(@Body() dto: BanCustomerDto){
    return this.customerService.banCustomer(dto)
  }

  @ApiOperation({ summary: 'Getting banned customers' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get('/ban')
  getBannedCustomers(){
    return this.customerService.getBannedCustomers()
  }

  @ApiOperation({ summary: 'Unbanning a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Post('/unban')
  unbanCustomer(@Body() dto: UnbanCustomerDto){
    return this.customerService.unbanCustomer(dto)
  }

  // Customer CRUD
  @ApiOperation({ summary: 'Creating a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Post()
  createCustomer(@Body()  dto: CreateCustomerDto){
    return this.customerService.createCustomer(dto)
  }

  @ApiOperation({ summary: 'Getting a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Get('/:id')
  getCustomer(@Param('id') id: number){
    return this.customerService.getCustomer(id)
  }


  @ApiOperation({ summary: 'Getting customers' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get()
  getCustomers(@Query() dto: GetCustomersDto){
    return this.customerService.getCustomers(dto)
  }

  @ApiOperation({
    summary: `Searching a customer by 'firstName', 'lastName', ` +
      `'phone', 'additionalPhone', 'factorID', 'kitchenID', 'language', 'userID'`
  })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get()
  searchCustomers(@Query() dto: SearchCustomerDto){
    return this.customerService.searchCustomers(dto)
  }

  @ApiOperation({ summary: 'Modifying a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Put('/:id')
  modifyCustomer(@Param('id') id: number, @Body() dto: UpdateCustomerDto){
    return this.customerService.modifyCustomer(id, dto)
  }

  @ApiOperation({ summary: 'Removing a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Delete('/:id')
  removeCustomer(@Param('id') id: number){
    return this.customerService.removeCustomer(id)
  }
}
