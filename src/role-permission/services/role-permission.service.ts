import { Injectable } from '@nestjs/common';
import { Permission } from 'src/repository/entities/permission.entity';
import { RolePermission } from 'src/repository/entities/role-permission.entity';
import { Role } from 'src/repository/entities/role.entity';
// eslint-disable-next-line max-len
import { RolePermissionRepository } from 'src/repository/repositories/role-permission/role-permission.repository';

@Injectable()
export class RolePermissionService {
  constructor(private readonly rolePermissionRepository: RolePermissionRepository) {}

  async create(role: Role, permissions: Permission[]): Promise<RolePermission[]> {
    const rolePermissions = permissions.map((permission) => {
      const newRolePermission = new RolePermission({
        role,
        permission,
      });
      return this.rolePermissionRepository.create(newRolePermission);
    });

    return await Promise.all(rolePermissions);
  }
}
