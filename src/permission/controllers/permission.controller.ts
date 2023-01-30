import { Body, Controller, Post } from '@nestjs/common';
import { PermissionDTO } from 'src/dtos/permission.dto';
import { Permission } from 'src/repository/entities/permission.entity';
import { PermissionService } from '../services/permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  async create(@Body() permissionDTO: PermissionDTO): Promise<Permission> {
    return await this.permissionService.create(permissionDTO);
  }
}
