import { Injectable } from '@nestjs/common';
import { EntityManager, ObjectType } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BaseRepository<T> {
  constructor(
    protected readonly entityClass: ObjectType<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  async findOneById(id: string): Promise<T> {
    return await this.entityManager
      .createQueryBuilder()
      .select()
      .from(this.entityClass, this.entityClass.name)
      .where('id = :id', { id })
      .andWhere('deleted = false')
      .execute();
  }

  async create(data: T): Promise<T> {
    return await this.entityManager.save(data);
  }

  async findByIds(ids: string[]): Promise<T[]> {
    return await this.entityManager
      .createQueryBuilder()
      .select()
      .from(this.entityClass, this.entityClass.name)
      .where('id = ANY(:ids)', { ids })
      .andWhere('deleted = false')
      .execute();
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await this.entityManager
      .createQueryBuilder()
      .update(this.entityClass)
      .set({
        ...data,
        updatedAt: new Date(),
        updatedBy: uuidv4(),
      })
      .where('id = :id', { id })
      .andWhere('deleted = false')
      .execute();

    return await this.findOneById(id);
  }
}
