import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';
import { NotFoundException } from '@nestjs/common';

export class RoleRepository extends BaseRepository<Role> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(Role, entityManager);
  }

  async findByName(name: string): Promise<Role> {
    const queryResult = await this.entityManager.findOne(Role, {
      where: { name },
    });

    if (!queryResult) {
      throw new NotFoundException(`role ${name} is not found`);
    }

    return queryResult;
  }
}
