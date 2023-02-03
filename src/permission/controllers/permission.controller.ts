import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PermissionDTO } from '../../dtos/permission.dto';
import { Permission } from '../../repository/entities/permission.entity';
import { PermissionService } from '../services/permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  async create(@Body() permissionDTO: PermissionDTO): Promise<Permission> {
    return await this.permissionService.create(permissionDTO);
  }

  @Get()
  async findByIds(@Query('ids') ids: string[]): Promise<Permission[]> {
    return await this.permissionService.findByIds(ids);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Permission> {
    return await this.permissionService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDTO: Partial<Permission>,
  ): Promise<Permission> {
    return await this.permissionService.update(id, updatePermissionDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.permissionService.delete(id);
  }
}
