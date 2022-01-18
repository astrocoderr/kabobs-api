import {
  Body, Controller, Delete, Get, Param,
  Post, Put, Query, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';
import { GroupIngredient } from '../models/group-ingredients.model';
import { CreateGroupIngredientDto } from '../dto/create-group-ingredient.dto';
import { GroupIngredientsService } from '../services/group-ingredients.service';
import { UpdateGroupIngredientDto } from '../dto/update-group-ingredient.dto';
import { GetGroupIngredientsDto } from '../dto/get-group-ingredients.dto';


@ApiTags('Group Ingredient')
@UseGuards(JwtAuthGuard)
@Controller('group-ingredients')
export class GroupIngredientsController {
  constructor(private groupIngredientService: GroupIngredientsService) {}

  // Group Ingredient CRUD
  @ApiOperation({ summary: 'Creating a group ingredient' })
  @ApiResponse({ status: 200, type: GroupIngredient })
  @Post()
  createGroupIngredient(@Body()  dto: CreateGroupIngredientDto){
    return this.groupIngredientService.createGroupIngredient(dto)
  }

  @ApiOperation({ summary: 'Getting a group ingredient' })
  @ApiResponse({ status: 200, type: GroupIngredient })
  @Get('/:id')
  getGroupIngredient(@Param('id') id: number){
    return this.groupIngredientService.getGroupIngredient(id)
  }

  @ApiOperation({ summary: 'Getting group ingredients' })
  @ApiResponse({ status: 200, type: [GroupIngredient] })
  @Get()
  getGroupIngredients(@Query() dto: GetGroupIngredientsDto){
    return this.groupIngredientService.getGroupIngredients(dto)
  }

  @ApiOperation({ summary: 'Modifying a group ingredient' })
  @ApiResponse({ status: 200, type: GroupIngredient })
  @Put('/:id')
  modifyGroupIngredient(@Param('id') id: number, @Body() dto: UpdateGroupIngredientDto){
    return this.groupIngredientService.modifyGroupIngredient(id, dto)
  }

  @ApiOperation({ summary: 'Removing a group ingredient' })
  @ApiResponse({ status: 200, type: GroupIngredient })
  @Delete('/:id')
  removeGroupIngredient(@Param('id') id: number){
    return this.groupIngredientService.removeGroupIngredient(id)
  }
}
