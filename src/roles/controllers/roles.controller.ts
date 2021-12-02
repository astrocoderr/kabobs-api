import {
  Body, Controller, Delete, Get, Param,
  Post, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../models/roles.model';
import { JwtAuthGuard } from '../../auth/handlers/jwt-auth.guard';

@ApiTags('Roles' )
@UseGuards(JwtAuthGuard)
@Controller('/roles')
export class RolesController {
  constructor(private roleService: RolesService) {
  }

  @ApiOperation({ summary: 'Creating a role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  createRole(@Body() dto: CreateRoleDto){
    return this.roleService.createRole(dto)
  }

  @ApiOperation({ summary: 'Getting roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getRoles(){
    return this.roleService.getRoles()
  }

  @ApiOperation({ summary: 'Getting a role' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:id')
  getRole(@Param('id') id: number){
    return this.roleService.getRole(id)
  }

  @ApiOperation({ summary: 'Removing a role' })
  @ApiResponse({ status: 200, type: Role })
  @Delete('/:id')
  removeRole(@Param('id') id: number){
    return this.roleService.removeRole(id)
  }
}
