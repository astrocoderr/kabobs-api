import {
  Body, Controller, Delete, Get, Param,
  Post, Put, Query, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';
import { TechcardsService } from '../services/techcards.service';
import { Techcard } from '../models/techcards.model';
import { CreateTechcardsDto } from '../dto/create-techcards.dto';
import { SearchTechcardDto } from '../dto/search-techcard.dto';
import { UpdateTechcardDto } from '../dto/update-techcard-dto';
import { GetTechcardsDto } from '../dto/get-techcards.dto';


@ApiTags('Techcards')
@UseGuards(JwtAuthGuard)
@Controller('techcards')
export class TechcardsController {
  constructor(private techcardsService: TechcardsService) {}

  // Techcards CRUD
  @ApiOperation({ summary: 'Creating a techcard' })
  @ApiResponse({ status: 200, type: Techcard })
  @Post()
  createTechcard(@Body()  dto: CreateTechcardsDto){
    return this.techcardsService.createTechcard(dto)
  }

  @ApiOperation({ summary: 'Getting techcards' })
  @ApiResponse({ status: 200, type: [Techcard] })
  @Get()
  getTechcards(@Query() dto: GetTechcardsDto){
    return this.techcardsService.getTechcards(dto)
  }

  @ApiOperation({ summary:
      "Search order by 'type', 'title', 'marketingTitle', 'description', " +
      "'kcal', 'prot', 'fat', 'carb', 'ingredientsAmount', 'amount', 'brutto', " +
      "'amountPiece' and 'percent'"
  })
  @ApiResponse({ status: 200, type: [Techcard] })
  @Get('/search')
  searchTechcards(@Query() search: SearchTechcardDto){
    return this.techcardsService.searchTechcard(search)
  }

  @ApiOperation({ summary: 'Getting a techcard' })
  @ApiResponse({ status: 200, type: Techcard })
  @Get('/:id')
  getTechcard(@Param('id') id: number){
    return this.techcardsService.getTechcard(id)
  }

  @ApiOperation({ summary: 'Modifying a techcard' })
  @ApiResponse({ status: 200, type: Techcard })
  @Put('/:id')
  modifyTechcard(@Param('id') id: number, @Body() dto: UpdateTechcardDto){
    return this.techcardsService.modifyTechcard(id, dto)
  }

  @ApiOperation({ summary: 'Removing a teachcard' })
  @ApiResponse({ status: 200, type: Techcard })
  @Delete('/:id')
  removeTechcard(@Param('id') id: number){
    return this.techcardsService.removeTechcard(id)
  }
}
