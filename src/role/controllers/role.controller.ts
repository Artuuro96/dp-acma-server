import { Body, Controller, Post } from '@nestjs/common';
import { RoleDTO } from 'src/dtos/role.dto';
import { RoleService } from '../services/role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() role: RoleDTO) {
    return this.roleService.create(role);
  }
}
