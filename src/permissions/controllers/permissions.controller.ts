import {
  Body, Controller, Delete, Get, Param,
  Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
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
  @Post()
  createPermission(@Body()  dto: CreatePermissionDto){
    return this.permissionsService.createPermission(dto)
  }

  @ApiOperation({ summary: 'Getting a permission' })
  @Get('/:name')
  getPermission(@Param('name') name: string){
    return this.permissionsService.getPermission(name)
  }

  @ApiOperation({ summary: 'Getting permission' })
  @Get()
  getPermissions(){
    return this.permissionsService.getPermissions()
  }

  @ApiOperation({ summary: 'Modifying a permission' })
  @Put('/:name')
  modifyPermission(@Param('name') name: string, @Body() dto: UpdatePermissionDto){
    return this.permissionsService.modifyPermission(name, dto)
  }

  @ApiOperation({ summary: 'Removing a permission' })
  @Delete('/:name')
  removePermission(@Param('name') name: string){
    return this.permissionsService.removePermission(name)
  }
}
