import { Injectable } from '@nestjs/common';
import { PermissionDTO } from 'src/dtos/permission.dto';
import { Permission } from '../../repository/entities/permission.entity';
import { PermissionRepository } from '../../repository/repositories/permission/permission.repository';
import { Context } from 'src/auth/context/execution-ctx';
@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  /**
   * @name create
   * @param {PermissionDTO} permission
   * @returns {Promise<Permission>}
   */
  async create(executionCtx: Context, permission: PermissionDTO): Promise<Permission> {
    const newPermission = new Permission({
      ...permission,
      createdBy: executionCtx.userId,
      createdAt: new Date(),
    });
    return await this.permissionRepository.create(newPermission);
  }

  /**
   * @name findById
   * @param {string} id
   * @returns {Promise<Permission>}
   */
  async findOneById(id: string): Promise<Permission> {
    return await this.permissionRepository.findOneById(id);
  }

  /**
   * @name findByRoleId
   * @param {string} roleId
   * @returns {Promise<Permission[]>}
   */
  async findByRoleId(roleId: string): Promise<Permission[]> {
    return await this.permissionRepository.findByRoleId(roleId);
  }

  /**
   * @name findByName
   * @param {Context} ExecutionCtx
   * @param {string} id
   * @return {Promise<Permission>}
   */
  async findByName(executionCtx: Context, name: string): Promise<Permission> {
    return await this.permissionRepository.findByName(name);
  }

  /**
   * @name update
   * @param {string} id
   * @param {Partial<PermissionDTO>} updatePermission
   * @returns {Promise<Permission>}
   */
  async update(
    executionCtx: Context,
    id: string,
    updatePermission: Partial<PermissionDTO>,
  ): Promise<Permission> {
    const permissionToUpdate = new Permission({
      ...updatePermission,
    });
    await this.permissionRepository.update(executionCtx, id, permissionToUpdate);
    return await this.permissionRepository.findOneById(id);
  }

  /**
   * @name delete
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(executionCtx: Context, id: string): Promise<void> {
    return await this.permissionRepository.delete(executionCtx, id);
  }
}
