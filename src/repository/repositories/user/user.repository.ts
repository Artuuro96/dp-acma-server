import { NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Module } from 'src/repository/entities/module.entity';
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
      .addSelect('userModules')
      .addSelect('modules')
      .leftJoin('user.userRoles', 'userRoles')
      .leftJoin('userRoles.role', 'roles')
      .leftJoin('user.userModules', 'userModules')
      .leftJoin('userModules.module', 'modules')
      .where('user.username = :username', { username })
      .andWhere('user.deleted = false')
      .getOne();

    if (!queryResult) {
      throw new NotFoundException([`user ${username} not found`, `usuario ${username} no encontrado`]);
    }
    const modules = queryResult.userModules?.map((userModule) => new Module(userModule.module));
    const roles = queryResult.userRoles?.map((userRole) => new Role(userRole.role));
    return new User({ ...queryResult, roles, modules });
  }

  async findOneById(id: string): Promise<User> {
    const queryResult = await this.entityManager
      .createQueryBuilder(User, 'user')
      .select('user')
      .addSelect('userRoles')
      .addSelect('roles')
      .addSelect('userModules')
      .addSelect('modules')
      .leftJoin('user.userRoles', 'userRoles')
      .leftJoin('userRoles.role', 'roles')
      .leftJoin('user.userModules', 'userModules')
      .leftJoin('userModules.module', 'modules')
      .where('user.id = :id', { id })
      .andWhere('user.deleted = false')
      .getOne();

    if (!queryResult) {
      throw new NotFoundException([`user ${id} not found`, `usuario no encontrado`]);
    }
    const modules = queryResult.userModules?.map((userModule) => new Module(userModule.module));
    const roles = queryResult.userRoles?.map((userRole) => new Role(userRole.role));
    delete queryResult?.userModules;
    delete queryResult?.userRoles;
    return new User({ ...queryResult, roles, modules });
  }

  async findAll(): Promise<User[]> {
    const queryResults = await this.entityManager
      .createQueryBuilder(User, 'user')
      .select('user')
      .addSelect('userRoles')
      .addSelect('roles')
      .addSelect('userModules')
      .addSelect('modules')
      .leftJoin('user.userRoles', 'userRoles')
      .leftJoin('userRoles.role', 'roles')
      .leftJoin('user.userModules', 'userModules')
      .leftJoin('userModules.module', 'modules')
      .where('user.deleted = false')
      .getMany();

    const users = queryResults.map((user) => {
      user.roles = user.userRoles.map(
        (userRole) =>
          new Role({
            id: userRole.role.id,
            name: userRole.role.name,
          }),
      );

      user.modules = user.userModules.map(
        (userModule) =>
          new Module({
            id: userModule.module.id,
            name: userModule.module.name,
          }),
      );

      delete user.userRoles;
      delete user.userModules;
      return user;
    });

    return users;
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    const queryResult = await this.entityManager
      .createQueryBuilder(User, 'user')
      .select('user')
      .whereInIds(ids)
      .getMany();

    return queryResult.map((user) => {
      delete user.refreshToken;
      delete user.password;
      return user;
    });
  }
}
