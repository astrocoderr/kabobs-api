import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AddressesService } from '../services/addresses.service';
import { Addresses } from '../models/addresses.model';
import { CreateAddressDto } from '../dto/create-address.dto';
import { GetAddressesDto } from '../dto/get-addresses.dto';


@ApiTags('Addresses')
@Controller('/addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {
  }

  @ApiOperation({ summary: 'Creating an address' })
  @ApiResponse({ status: 200, type: Addresses })
  @Post()
  createAddress(@Body() dto: CreateAddressDto){
    return this.addressesService.createAddress(dto)
  }

  @ApiOperation({ summary: 'Getting addresses' })
  @ApiResponse({ status: 200, type: [Addresses] })
  @Get()
  getAddresses(@Query() dto: GetAddressesDto){
    return this.addressesService.getAddresses(dto)
  }

  @ApiOperation({ summary: 'Getting an address' })
  @ApiResponse({ status: 200, type: Addresses })
  @Get('/:id')
  getAddress(@Param('id') id: number){
    return this.addressesService.getAddress(id)
  }

  @ApiOperation({ summary: 'Removing an address' })
  @ApiResponse({ status: 200, type: Addresses })
  @Delete('/:id')
  removeAddress(@Param('id') id: number){
    return this.addressesService.removeAddress(id)
  }
}
