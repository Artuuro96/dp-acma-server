import { Injectable } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { EntityManager, ObjectType } from 'typeorm';

@Injectable()
export class BaseRepository<T> {
  constructor(
    protected readonly entityClass: ObjectType<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  async create(data: T): Promise<T> {
    return await this.entityManager.save(data);
  }

  async update(executionCtx: Context, id: string, data: Partial<T>): Promise<void> {
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
