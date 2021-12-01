import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AddressesService } from '../services/addresses.service';
import { Addresses } from '../models/addresses.model';
import { CreateAddressDto } from '../dto/create-address.dto';


@ApiTags('Addresses')
@Controller('/addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {
  }

  @ApiOperation({ summary: 'Creating an address' })
  @ApiResponse({ status: 200, type: Addresses })
  @Post()
  createRole(@Body() dto: CreateAddressDto){
    return this.addressesService.createAddress(dto)
  }

  @ApiOperation({ summary: 'Getting addresses' })
  @ApiResponse({ status: 200, type: [Addresses] })
  @Get()
  getRoles(){
    return this.addressesService.getAddresses()
  }

  @ApiOperation({ summary: 'Getting an address' })
  @ApiResponse({ status: 200, type: Addresses })
  @Get('/:id')
  getRole(@Param('id') id: number){
    return this.addressesService.getAddress(id)
  }

  @ApiOperation({ summary: 'Removing an address' })
  @ApiResponse({ status: 200, type: Addresses })
  @Delete('/:id')
  removeAddress(@Param('id') id: number){
    return this.addressesService.removeAddress(id)
  }
}
