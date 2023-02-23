import { NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from 'src/repository/entities/role.entity';
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
      .addSelect('userRoles')
      .addSelect('roles')
      .leftJoin('user.userRoles', 'userRoles')
      .leftJoin('userRoles.role', 'roles')
      .where('user.username = :username', { username })
      .andWhere('user.deleted = false')
      .getOne();

    if (!queryResult) {
      throw new NotFoundException(`user ${username} not found`);
    }
    const roles = queryResult.userRoles?.map((userRole) => new Role(userRole.role));
    return new User({ ...queryResult, roles });
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
