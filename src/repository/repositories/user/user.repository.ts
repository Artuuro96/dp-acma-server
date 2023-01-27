import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../entities/user.entity';
import { BaseRepository } from '../base/base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(User, entityManager);
  }

  /**
   * Finds user by id
   * @param {string}       id      - Unique identifier for user
   */
  async findByName(name: string): Promise<User> {
    const response = await this.entityManager
      .createQueryBuilder(User, 'user')
      .select('user')
      .where('user.name = :name', { name })
      .getOne();

    return response;
  }
}
