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
   * @param {PermissionDTO} permission - permission data transfer object to be saved
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
   * @param {string[]} ids - permission identifiers to look for
   * @returns {Promise<Permission[]>}
   */
  async findByIds(ids: string[]): Promise<Permission[]> {
    return await this.permissionRepository.findByIds(ids);
  }

  /**
   * @name findById
   * @param {string} id - permission identifier to look for
   * @returns {Promise<Permission>}
   */
  async findById(id: string): Promise<Permission> {
    return await this.permissionRepository.findOneById(id);
  }

  /**
   * @name update
   * @param {string} id - permission identifier
   * @param {Partial<PermissionDTO>} updatePermission - permission data transfer object to update
   * @returns {Promise<Permission>}
   */
  async update(
    id: string,
    updatePermission: Partial<PermissionDTO>,
  ): Promise<Permission> {
    return await this.permissionRepository.update(id, updatePermission);
  }
}
