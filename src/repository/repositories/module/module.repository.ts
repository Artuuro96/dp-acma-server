import { InjectEntityManager } from '@nestjs/typeorm';
import { Module } from 'src/repository/entities/module.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';

export class ModuleRepository extends BaseRepository<Module> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(Module, entityManager);
  }

  async findByName(name: string): Promise<Module> {
    return await this.entityManager
      .createQueryBuilder(Module, 'module')
      .select()
      .where('name = :name', { name })
      .andWhere('deleted = false')
      .getOne();
  }

  async findAll(): Promise<Module[]> {
    return await this.entityManager.createQueryBuilder(Module, 'module').select().getMany();
  }
}
