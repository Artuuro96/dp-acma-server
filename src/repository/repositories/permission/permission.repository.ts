import { InjectEntityManager } from '@nestjs/typeorm';
import { Permission } from '../../entities/permission.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';

export class PermissionRepository extends BaseRepository<Permission> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(Permission, entityManager);
  }
}
