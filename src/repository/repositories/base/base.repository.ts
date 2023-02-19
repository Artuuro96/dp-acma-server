import { Injectable } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { EntityManager, ObjectType } from 'typeorm';

@Injectable()
export class BaseRepository<T> {
  constructor(
    protected readonly entityClass: ObjectType<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  async findOneById(id: string): Promise<T> {
    const queryResult = await this.entityManager
      .createQueryBuilder()
      .select()
      .from(this.entityClass, this.entityClass.name)
      .where('id = :id', { id })
      .andWhere('deleted = false')
      .getRawOne();

    console.log("=============>", typeof(queryResult));
    return queryResult;
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

  async update(executionCtx: Context, id: string, data: Partial<T>): Promise<T> {
    await this.entityManager
      .createQueryBuilder()
      .update(this.entityClass)
      .set({
        ...data,
        updatedAt: new Date(),
        updatedBy: executionCtx.userId,
      })
      .where('id = :id', { id })
      .andWhere('deleted = false')
      .execute();

    return await this.findOneById(id);
  }

  async delete(executionCtx: Context, id: string): Promise<void> {
    await this.entityManager
      .createQueryBuilder()
      .update(this.entityClass)
      .set({
        deleted: true,
        deletedAt: new Date(),
        deletedBy: executionCtx.userId,
      })
      .where('id = :id', { id })
      .andWhere('deleted = false')
      .execute();
  }
}
