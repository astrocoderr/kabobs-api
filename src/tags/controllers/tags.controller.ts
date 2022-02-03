import {
  Body, Controller, Delete, Get,
  Param, Post, Put, Query, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Techcard } from '../../techcards/models/techcards.model';
import { TagsService } from '../services/tags.service';
import { Tag } from '../models/tags.model';
import { CreateTagsDto } from '../dto/create-tags.dto';
import { GetTagsDto } from '../dto/get-tags.dto';
import { UpdateTagsDto } from '../dto/update-tags.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';


@ApiTags('Tags')
@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  // Tags CRUD
  @ApiOperation({ summary: 'Creating a tag' })
  @ApiResponse({ status: 200, type: Tag })
  @Post()
  createTag(@Body()  dto: CreateTagsDto){
    return this.tagsService.createTag(dto)
  }

  @ApiOperation({ summary: 'Getting tags' })
  @ApiResponse({ status: 200, type: [Tag] })
  @Get()
  getTags(@Query() dto: GetTagsDto){
    return this.tagsService.getTags(dto)
  }

  @ApiOperation({ summary: 'Getting a tag' })
  @ApiResponse({ status: 200, type: Tag })
  @Get('/:id')
  getTag(@Param('id') id: number){
    return this.tagsService.getTag(id)
  }

  @ApiOperation({ summary: 'Modifying a tag' })
  @ApiResponse({ status: 200, type: Tag })
  @Put('/:id')
  modifyTag(@Param('id') id: number, @Body() dto: UpdateTagsDto){
    return this.tagsService.modifyTag(id, dto)
  }

  @ApiOperation({ summary: 'Removing a tag' })
  @ApiResponse({ status: 200, type: Techcard })
  @Delete('/:id')
  removeTag(@Param('id') id: number){
    return this.tagsService.removeTag(id)
  }
}
