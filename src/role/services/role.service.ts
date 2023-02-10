import { Injectable } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { RoleDTO } from 'src/dtos/role.dto';
import { PermissionService } from 'src/permission/services/permission.service';
import { Role } from 'src/repository/entities/role.entity';
import { RoleRepository } from 'src/repository/repositories/role/role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionService: PermissionService,
  ) {}

  async create(executionCtx: Context, role: RoleDTO): Promise<Role> {
    const { permissions } = role;
    const permissionsPromise = permissions.map((permission) => {
      return this.permissionService.findByName(executionCtx, permission);
    });

    const foundPermissions = await Promise.all(permissionsPromise);
    const newRole = new Role({
      ...role,
      createdBy: executionCtx.userId,
      createdAt: new Date(),
      permissions: foundPermissions,
    });

    return await this.roleRepository.create(newRole);
  }

  async findByName(name: string): Promise<Role> {
    return this.roleRepository.findByName(name);
  }
}
