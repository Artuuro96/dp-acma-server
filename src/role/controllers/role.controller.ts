import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ExecutionCtx } from 'src/auth/decorators/execution-ctx.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleDTO } from 'src/dtos/role.dto';
import { RoleService } from '../services/role.service';

@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@ExecutionCtx() executionCtx: Context, @Body() role: RoleDTO) {
    return this.roleService.create(executionCtx, role);
  }
}
