import { Injectable } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { RoleDTO } from 'src/dtos/role.dto';
import { PermissionService } from 'src/permission/services/permission.service';
import { Role } from 'src/repository/entities/role.entity';
import { RoleRepository } from 'src/repository/repositories/role/role.repository';
import { RoleUpdateDTO } from 'src/dtos/role-update.dto';
import { RolePermissionService } from 'src/role-permission/services/role-permission.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionService: PermissionService,
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  /**
   * @name create
   * @param {Context} executionCtx
   * @param {RoleDTO} role
   * @returns {Promise<Role>}
   */
  async create(executionCtx: Context, role: RoleDTO): Promise<Role> {
    const { permissions } = role;

    const permissionsPromise = permissions.map((permission) => {
      return this.permissionService.findByName(executionCtx, permission);
    });

    const foundPermissions = await Promise.all(permissionsPromise);

    const newRole = new Role();
    newRole.name = role.name;
    newRole.description = role.description;
    newRole.createdBy = executionCtx.userId;
    newRole.createdAt = new Date();

    const createdRole = await this.roleRepository.create(newRole);
    await this.rolePermissionService.create(createdRole, foundPermissions);

    return createdRole;
  }

  /**
   * @name update
   * @param {Context} executionCtx
   * @param {id} id
   * @param {Partial<RoleDTO>} role
   * @returns {Promise<Role>}
   */
  async updateById(executionCtx: Context, id: string, role: Partial<RoleUpdateDTO>): Promise<Role> {
    const roleToUpdate = new Role({
      ...role,
    });
    await this.roleRepository.update(executionCtx, id, roleToUpdate);
    return await this.roleRepository.findOneById(id);
  }

  /*async findRolesByUserId(userId: string): Pomise<Role[]> {
   
  }*/

  async findByName(name: string): Promise<Role> {
    return this.roleRepository.findByName(name);
  }

  async findOneById(id: string): Promise<Role> {
    return this.roleRepository.findOneById(id);
  }
}
