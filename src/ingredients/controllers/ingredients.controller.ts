import {
  Body, Controller, Delete, Get, Param,
  Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';
import { IngredientsService } from '../services/ingredients.service';
import { Ingredient } from '../models/ingredients.model';
import { CreateIngerdientDto } from '../dto/create-ingerdient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';


@ApiTags('Ingredient')
@UseGuards(JwtAuthGuard)
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  // Ingredient CRUD
  @ApiOperation({ summary: 'Creating an ingredient' })
  @ApiResponse({ status: 200, type: Ingredient })
  @Post()
  createOrder(@Body()  dto: CreateIngerdientDto){
    return this.ingredientsService.createIngredient(dto)
  }

  @ApiOperation({ summary: 'Getting an ingredient' })
  @ApiResponse({ status: 200, type: Ingredient })
  @Get('/:id')
  getOrder(@Param('id') id: number){
    return this.ingredientsService.getIngredient(id)
  }

  @ApiOperation({ summary: 'Getting ingredients' })
  @ApiResponse({ status: 200, type: [Ingredient] })
  @Get()
  getOrders(){
    return this.ingredientsService.getIngredients()
  }

  @ApiOperation({ summary: 'Modifying an ingredient' })
  @ApiResponse({ status: 200, type: Ingredient })
  @Put('/:id')
  modifyOrder(@Param('id') id: number, @Body() dto: UpdateIngredientDto){
    return this.ingredientsService.modifyIngredient(id, dto)
  }

  @ApiOperation({ summary: 'Removing an ingredient' })
  @ApiResponse({ status: 200, type: Ingredient })
  @Delete('/:id')
  removeOrder(@Param('id') id: number){
    return this.ingredientsService.removeIngredient(id)
  }
}
