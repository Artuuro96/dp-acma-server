import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';
import { NotFoundException } from '@nestjs/common';

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
      .select()
      .where('id = :id', { id })
      .andWhere('deleted = false')
      .getOne();

    if (!queryResult) {
      throw new NotFoundException([`role ${id} not found`, `role ${id} no encontrado`]);
    }
    return queryResult;
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

  /*async findRolesByUserId(userId: string): Promise<Role[]> {
    const queryResult = await this.entityManager
      .createQueryBuilder()
      .select()
      .leftJoin()
  }*/
}
