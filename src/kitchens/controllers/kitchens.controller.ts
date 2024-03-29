import {
  Body, Controller, Delete, Get, Param, Post, Put, Query,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { KitchensService } from '../services/kitchens.service';
import { Kitchen } from '../models/kitchens.model';
import { CreateKitchenDto } from '../dto/create-kitchen.dto';
import { UpdateKitchenDto } from '../dto/update-kitchen.dto';
import { GetKitchensDto } from '../dto/get-kitchens.dto';


@ApiTags('Kitchens')
@UseGuards(JwtAuthGuard)
@Controller('kitchens')
export class KitchensController {
  constructor(private kitchenService: KitchensService) {}

  // Kitchen CRUD
  @ApiOperation({ summary: 'Creating a kitchen' })
  @ApiResponse({ status: 200, type: Kitchen })
  @Post()
  createKitchen(@Body()  dto: CreateKitchenDto){
    return this.kitchenService.createKitchen(dto)
  }

  @ApiOperation({ summary: 'Getting a kitchen' })
  @ApiResponse({ status: 200, type: Kitchen })
  @Get('/:id')
  getKitchen(@Param('id') id: number){
    return this.kitchenService.getKitchen(id)
  }

  @ApiOperation({ summary: 'Getting kitchens' })
  @ApiResponse({ status: 200, type: [Kitchen] })
  @Get()
  getKitchens(@Query() dto: GetKitchensDto){
    return this.kitchenService.getKitchens(dto)
  }

  @ApiOperation({ summary: 'Modifying a kitchen' })
  @ApiResponse({ status: 200, type: Kitchen })
  @Put('/:id')
  modifyKitchen(@Param('id') id: number, @Body() dto: UpdateKitchenDto){
    return this.kitchenService.modifyKitchen(id, dto)
  }

  @ApiOperation({ summary: 'Removing a kitchen' })
  @ApiResponse({ status: 200, type: Kitchen })
  @Delete('/:id')
  removeKitchen(@Param('id') id: number){
    return this.kitchenService.removeKitchen(id)
  }
}
