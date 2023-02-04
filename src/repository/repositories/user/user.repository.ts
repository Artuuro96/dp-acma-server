import { InjectEntityManager } from '@nestjs/typeorm';
import { UserDTO } from 'src/dtos/user.dto';
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

  async findOne(username: string): Promise<User> {
    const userFound = await this.entityManager
      .createQueryBuilder(User, 'user')
      .select('user')
      .where('user.username = :username', { username })
      .andWhere('user.deleted = false')
      .getOne();

    return userFound;
  }

  async createNew(user: UserDTO): Promise<User> {
    const newUser = new User(user);
    return this.create(newUser);
  }
}
