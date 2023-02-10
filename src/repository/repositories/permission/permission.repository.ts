import { InjectEntityManager } from '@nestjs/typeorm';
import { Permission } from '../../entities/permission.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';
import { NotFoundException } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';

export class PermissionRepository extends BaseRepository<Permission> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(Permission, entityManager);
  }

  /**
   * @name findByName
   * @param {}
   * @param
   */
  async findByName(executionCtx: Context, name: string): Promise<Permission> {
    const queryResult = await this.entityManager
      .createQueryBuilder(Permission, 'permission')
      .select()
      .where('name = :name', { name })
      .andWhere('deleted = false')
      .getOne();

    if (!queryResult) {
      throw new NotFoundException(`permission ${name} not found`);
    }

    return queryResult;
  }
}
