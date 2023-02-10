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
   * @name findByIds
   * @param {string[]} ids
   * @returns {Promise<Permission[]>}
   */
  async findByIds(ids: string[]): Promise<Permission[]> {
    return await this.permissionRepository.findByIds(ids);
  }

  /**
   * @name findById
   * @param {string} id
   * @returns {Promise<Permission>}
   */
  async findById(id: string): Promise<Permission> {
    return await this.permissionRepository.findOneById(id);
  }

  /**
   * @name findByName
   * @param {Context} ExecutionCtx
   * @param {string} id
   * @return {Promise<Permission>}
   */
  async findByName(executionCtx: Context, name: string): Promise<Permission> {
    return await this.permissionRepository.findByName(executionCtx, name);
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
    return await this.permissionRepository.update(executionCtx, id, updatePermission);
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
