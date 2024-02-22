import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';
import { NotFoundException } from '@nestjs/common';
import { Permission } from 'src/repository/entities';

export class RoleRepository extends BaseRepository<Role> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(Role, entityManager);
  }

  /**
   * @name findOneById
   * @param {string} id
   * @returns {Promise<Role>}
   */
  async findOneById(id: string): Promise<Role> {
    const queryResult = await this.entityManager
      .createQueryBuilder(Role, 'role')
      .select('role')
      .addSelect('rolePermissions')
      .addSelect('permissions') // Selecciona los permisos
      .leftJoin('role.rolePermissions', 'rolePermissions')
      .leftJoin('rolePermissions.permission', 'permissions') // Une con la tabla "permissions"
      .where('role.id = :id', { id })
      .andWhere('role.deleted = false')
      .andWhere('permissions.deleted = false') // Asegúrate de que los permisos no estén eliminados
      .getOne();

    if (!queryResult) {
      throw new NotFoundException([`role ${id} not found`, `role ${id} no encontrado`]);
    }

    const permissions = queryResult.rolePermissions?.map(
      (rolePermission) => new Permission(rolePermission.permission),
    );
    delete queryResult.rolePermissions;
    return new Role({ ...queryResult, permissions });
  }

  async findByName(name: string): Promise<Role> {
    const queryResult = await this.entityManager.findOne(Role, {
      where: { name },
    });

    if (!queryResult) {
      throw new NotFoundException([`role ${name} is not found`, `role ${name} no encontrado`]);
    }

    return queryResult;
  }

  async findByUserId(userId: string): Promise<Role[]> {
    const queryResult = await this.entityManager
      .createQueryBuilder(Role, 'role')
      .select('role')
      .addSelect('userRoles')
      .addSelect('users')
      .leftJoin('role.userRoles', 'userRoles')
      .leftJoin('userRoles.user', 'users')
      .where('users.id = :userId', { userId })
      .getMany();

    return queryResult;
  }
}
