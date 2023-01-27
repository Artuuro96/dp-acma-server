import { Injectable } from '@nestjs/common';
import { EntityManager, ObjectType } from 'typeorm';

@Injectable()
export class BaseRepository<T> {
  constructor(
    protected readonly entityClass: ObjectType<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  findOneById(id: string): Promise<T> {
    return id as any;
  }
}
