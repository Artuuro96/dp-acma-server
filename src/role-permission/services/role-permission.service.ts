import { Injectable } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { PermissionService } from 'src/permission/services/permission.service';
import { Permission } from 'src/repository/entities/permission.entity';
import { RolePermission } from 'src/repository/entities/role-permission.entity';
import { Role } from 'src/repository/entities/role.entity';
// eslint-disable-next-line max-len
import { RolePermissionRepository } from 'src/repository/repositories/role-permission/role-permission.repository';

@Injectable()
export class RolePermissionService {
  constructor(
    private readonly rolePermissionRepository: RolePermissionRepository,
    private readonly permissionService: PermissionService,
  ) {}

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

  async assignByRoleId(
    executionCtx: Context,
    role: Role,
    permissionIds: string[],
  ): Promise<RolePermission[]> {
    const permissionsPromise = permissionIds.map((permissionId) =>
      this.permissionService.findOneById(permissionId),
    );
    const permissionsFound = await Promise.all(permissionsPromise);
    await this.rolePermissionRepository.deleteByRoleId(role.id);
    return await this.create(role, permissionsFound);
  }
}
