import {
  Body, Controller, Delete, Get, Param,
  Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';
import { Promocode } from '../models/promocodes.model';
import { PromocodesService } from '../services/promocodes.service';
import { CreatePromocodeDto } from '../dto/create-promocode.dto';
import { UpdatePromocodeDto } from '../dto/update-promocode.dto';


@ApiTags('Promocodes')
@UseGuards(JwtAuthGuard)
@Controller('promocodes')
export class PromocodesController {
  constructor(private promocodesService: PromocodesService) {}

  // Promocode CRUD
  @ApiOperation({ summary: 'Creating a promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Post()
  createUser(@Body()  dto: CreatePromocodeDto){
    return this.promocodesService.createPromocode(dto)
  }

  @ApiOperation({ summary: 'Getting a promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Get('/:id')
  getUser(@Param('id') id: number){
    return this.promocodesService.getPromocode(id)
  }

  @ApiOperation({ summary: 'Getting promocodes' })
  @ApiResponse({ status: 200, type: [Promocode] })
  @Get()
  getUsers(){
    return this.promocodesService.getPromocodes()
  }

  @ApiOperation({ summary: 'Modifying a promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Put('/:id')
  modifyUser(@Param('id') id: number, @Body() dto: UpdatePromocodeDto){
    return this.promocodesService.modifyPromocode(id, dto)
  }

  @ApiOperation({ summary: 'Removing a promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Delete('/:id')
  removeUser(@Param('id') id: number){
    return this.promocodesService.removePromocode(id)
  }
}
