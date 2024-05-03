import { InjectEntityManager } from '@nestjs/typeorm';
import { Permission } from '../../entities/permission.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';
import { NotFoundException } from '@nestjs/common';

export class PermissionRepository extends BaseRepository<Permission> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(Permission, entityManager);
  }

  /**
   * @name findOneById
   * @param {string} id
   * @returns {Promise<Permission>}
   */
  async findOneById(id: string): Promise<Permission> {
    const queryResult = await this.entityManager
      .createQueryBuilder(Permission, 'permission')
      .select()
      .where('id = :id', { id })
      .andWhere('deleted = false')
      .getOne();

    if (!queryResult) {
      throw new NotFoundException([`permission ${id} not found`, `id de permiso ${id} encontrado`]);
    }
    return queryResult;
  }

  /**
   * @name findByName
   * @param {string} name
   * @returns {promise<Permission>}
   */
  async findByName(name: string): Promise<Permission> {
    const queryResult = await this.entityManager
      .createQueryBuilder(Permission, 'permission')
      .select()
      .where('name = :name', { name })
      .andWhere('deleted = false')
      .getOne();

    if (!queryResult) {
      throw new NotFoundException([`permission ${name} not found`, `permiso ${name} no encontrado`]);
    }
    return queryResult;
  }

  /**
   * @name findByRoleId
   * @param {string} name
   * @returns {promise<Permission[]>}
   */
  async findByRoleId(roleId: string): Promise<Permission[]> {
    const queryResult = await this.entityManager
      .createQueryBuilder(Permission, 'permission')
      .select('permission')
      .addSelect('rolePermissions')
      .addSelect('roles')
      .leftJoin('permission.rolePermission', 'rolePermissions')
      .leftJoin('rolePermissions.role', 'roles')
      .where('roles.id = :id', { id: roleId })
      .getMany();

    if (!queryResult) {
      throw new NotFoundException([
        `permissions not found for role id ${roleId}`,
        `permisos no encontrados para el rol id ${roleId}`,
      ]);
    }
    return queryResult.map((permission) => {
      delete permission.rolePermission;
      return permission;
    });
  }
}
