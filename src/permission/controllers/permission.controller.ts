import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ExecutionCtx } from 'src/auth/decorators/execution-ctx.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionDTO } from '../../dtos/permission.dto';
import { Permission } from '../../repository/entities/permission.entity';
import { PermissionService } from '../services/permission.service';

@UseGuards(JwtAuthGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(
    @ExecutionCtx() executionCtx: Context,
    @Body() permissionDTO: PermissionDTO,
  ): Promise<Permission> {
    return await this.permissionService.create(executionCtx, permissionDTO);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Permission> {
    return await this.permissionService.findOneById(id);
  }

  @Get('roles/:id')
  async findRolesById(@Param('id') roleId: string): Promise<Permission[]> {
    return await this.permissionService.findByRoleId(roleId);
  }

  @Patch('/:id')
  async update(
    @ExecutionCtx() executionCtx: Context,
    @Param('id') id: string,
    @Body() updatePermissionDTO: Partial<Permission>,
  ): Promise<Permission> {
    return await this.permissionService.update(executionCtx, id, updatePermissionDTO);
  }

  @Delete('/:id')
  async delete(@ExecutionCtx() executionCtx: Context, @Param('id') id: string): Promise<void> {
    return await this.permissionService.delete(executionCtx, id);
  }
}
