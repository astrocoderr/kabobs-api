import {
  Body, Controller, Delete, Get, Param,
  Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Promocode } from '../../promocodes/models/promocodes.model';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';


@ApiTags('Permissions')
@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  // Permission CRUD
  @ApiOperation({ summary: 'Creating a permission' })
  @ApiResponse({ status: 200, type: Promocode })
  @Post()
  createPermission(@Body()  dto: CreatePermissionDto){
    return this.permissionsService.createPermission(dto)
  }

  @ApiOperation({ summary: 'Getting a permission' })
  @ApiResponse({ status: 200, type: Promocode })
  @Get('/:name')
  getPermission(@Param('name') name: string){
    return this.permissionsService.getPermission(name)
  }

  @ApiOperation({ summary: 'Getting permission' })
  @ApiResponse({ status: 200, type: [Promocode] })
  @Get()
  getPermissions(){
    return this.permissionsService.getPermissions()
  }

  @ApiOperation({ summary: 'Modifying a permission' })
  @ApiResponse({ status: 200, type: Promocode })
  @Put('/:name')
  modifyPermission(@Param('name') name: string, @Body() dto: UpdatePermissionDto){
    return this.permissionsService.modifyPermission(name, dto)
  }

  @ApiOperation({ summary: 'Removing a permission' })
  @ApiResponse({ status: 200, type: Promocode })
  @Delete('/:name')
  removePermission(@Param('name') name: string){
    return this.permissionsService.removePermission(name)
  }
}
