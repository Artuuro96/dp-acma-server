import { Injectable } from '@nestjs/common';
import { EntityManager, ObjectType } from 'typeorm';

@Injectable()
export class BaseRepository<T> {
  constructor(
    protected readonly entityClass: ObjectType<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  async findOneById(id: string): Promise<T> {
    return id as any;
  }

  async create(data: T): Promise<T> {
    console.log('--------->', data);
    return this.entityManager.save(data);
  }
}
