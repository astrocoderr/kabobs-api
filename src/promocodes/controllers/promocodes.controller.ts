import {
  Body, Controller, Delete, Get, Param,
  Post, Put, Query, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Promocode } from '../models/promocodes.model';
import { PromocodesService } from '../services/promocodes.service';
import { CreatePromocodeDto } from '../dto/create-promocode.dto';
import { UpdatePromocodeDto } from '../dto/update-promocode.dto';
import { GetPromocodesDto } from '../dto/get-promocodes.dto';


@ApiTags('Promocodes')
@UseGuards(JwtAuthGuard)
@Controller('promocodes')
export class PromocodesController {
  constructor(private promocodesService: PromocodesService) {}

  // Promocode CRUD
  @ApiOperation({ summary: 'Creating a promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Post()
  createPromocode(@Body()  dto: CreatePromocodeDto){
    return this.promocodesService.createPromocode(dto)
  }

  @ApiOperation({ summary: 'Getting a promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Get('/:id')
  getPromocode(@Param('id') id: number){
    return this.promocodesService.getPromocode(id)
  }

  @ApiOperation({ summary: 'Getting promocodes' })
  @ApiResponse({ status: 200, type: [Promocode] })
  @Get()
  getPromocodes(@Query() dto: GetPromocodesDto){
    return this.promocodesService.getPromocodes(dto)
  }

  @ApiOperation({ summary: 'Modifying a promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Put('/:id')
  modifyPromocode(@Param('id') id: number, @Body() dto: UpdatePromocodeDto){
    return this.promocodesService.modifyPromocode(id, dto)
  }

  @ApiOperation({ summary: 'Removing a promocode' })
  @ApiResponse({ status: 200, type: Promocode })
  @Delete('/:id')
  removePromocode(@Param('id') id: number){
    return this.promocodesService.removePromocode(id)
  }
}
