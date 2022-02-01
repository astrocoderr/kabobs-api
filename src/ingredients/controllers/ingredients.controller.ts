import {
  Body, Controller, Delete, Get, Param,
  Post, Put, Query, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IngredientsService } from '../services/ingredients.service';
import { Ingredient } from '../models/ingredients.model';
import { CreateIngerdientDto } from '../dto/create-ingerdient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { GetIngredientsDto } from '../dto/get-ingredients.dto';


@ApiTags('Ingredient')
@UseGuards(JwtAuthGuard)
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  // Ingredient CRUD
  @ApiOperation({ summary: 'Creating an ingredient' })
  @ApiResponse({ status: 200, type: Ingredient })
  @Post()
  createIngredient(@Body()  dto: CreateIngerdientDto){
    return this.ingredientsService.createIngredient(dto)
  }

  @ApiOperation({ summary: 'Getting an ingredient' })
  @ApiResponse({ status: 200, type: Ingredient })
  @Get('/:id')
  getIngredient(@Param('id') id: number){
    return this.ingredientsService.getIngredient(id)
  }

  @ApiOperation({ summary: 'Getting ingredients' })
  @ApiResponse({ status: 200, type: [Ingredient] })
  @Get()
  getIngredients(@Query() dto: GetIngredientsDto){
    return this.ingredientsService.getIngredients(dto)
  }

  @ApiOperation({ summary: 'Modifying an ingredient' })
  @ApiResponse({ status: 200, type: Ingredient })
  @Put('/:id')
  modifyIngredient(@Param('id') id: number, @Body() dto: UpdateIngredientDto){
    return this.ingredientsService.modifyIngredient(id, dto)
  }

  @ApiOperation({ summary: 'Removing an ingredient' })
  @ApiResponse({ status: 200, type: Ingredient })
  @Delete('/:id')
  removeIngredient(@Param('id') id: number){
    return this.ingredientsService.removeIngredient(id)
  }
}
