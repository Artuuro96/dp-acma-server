import { NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../entities/user.entity';
import { BaseRepository } from '../base/base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(User, entityManager);
  }

  async findOneByUsername(username: string): Promise<User> {
    const queryResult = await this.entityManager
      .createQueryBuilder(User, 'user')
      .select('user')
      .where('user.username = :username', { username })
      .andWhere('user.deleted = false')
      .getOne();

    if (!queryResult) {
      throw new NotFoundException(`user ${username} not found`);
    }
    return queryResult;
  }

  async findOneById(id: string): Promise<User> {
    return await this.entityManager
      .createQueryBuilder(User, 'user')
      .select('user')
      .where('user.id = id', { id })
      .andWhere('user.deleted = false')
      .getOne();
  }
}
