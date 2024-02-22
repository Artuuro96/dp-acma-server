import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ExecutionCtx } from 'src/auth/decorators/execution-ctx.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleUpdateDTO } from 'src/dtos/role-update.dto';
import { RoleDTO } from 'src/dtos/role.dto';
import { Role } from 'src/repository/entities/role.entity';
import { RoleService } from '../services/role.service';

@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@ExecutionCtx() executionCtx: Context, @Body() role: RoleDTO): Promise<Role> {
    return await this.roleService.create(executionCtx, role);
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<Role> {
    return await this.roleService.findOneById(id);
  }

  @Get('/user/:id')
  async findByUserId(@Param('id') userId: string): Promise<Role[]> {
    return await this.roleService.findByUserId(userId);
  }

  @Patch('/:id')
  async updateById(
    @ExecutionCtx() executionCtx: Context,
    @Param('id') id: string,
    @Body() role: Partial<RoleUpdateDTO>,
  ): Promise<Role> {
    return await this.roleService.updateById(executionCtx, id, role);
  }

  @Patch('/:id/assign/permission')
  async assignPermissionsByRoleId(
    @ExecutionCtx() executionCtx: Context,
    @Param('id') roleId: string,
    @Body('permissions') permissions: string[],
  ): Promise<Role> {
    return await this.roleService.assignRolesByPermissionId(executionCtx, roleId, permissions);
  }
}
