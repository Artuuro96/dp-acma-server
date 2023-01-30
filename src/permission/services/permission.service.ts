import { Injectable } from '@nestjs/common';
import { PermissionDTO } from 'src/dtos/permission.dto';
import { Permission } from 'src/repository/entities/permission.entity';
import { PermissionRepository } from 'src/repository/repositories/permission/permission.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  async create(permission: PermissionDTO): Promise<Permission> {
    const newPermission = new Permission({
      ...permission,
      createdBy: uuidv4(),
      createdAt: new Date(),
    });
    return await this.permissionRepository.create(newPermission);
  }
}
