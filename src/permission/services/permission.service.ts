import { Injectable } from '@nestjs/common';
import { PermissionDTO } from 'src/dtos/permission.dto';
import { Permission } from '../../repository/entities/permission.entity';
import { PermissionRepository } from '../../repository/repositories/permission/permission.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  /**
   * @name create
   * @param {PermissionDTO} permission
   * @returns {Promise<Permission>}
   */
  async create(permission: PermissionDTO): Promise<Permission> {
    const newPermission = new Permission({
      ...permission,
      createdBy: uuidv4(),
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
   * @name update
   * @param {string} id
   * @param {Partial<PermissionDTO>} updatePermission
   * @returns {Promise<Permission>}
   */
  async update(id: string, updatePermission: Partial<PermissionDTO>): Promise<Permission> {
    return await this.permissionRepository.update(id, updatePermission);
  }

  /**
   * @name delete
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    return await this.permissionRepository.delete(id);
  }
}
