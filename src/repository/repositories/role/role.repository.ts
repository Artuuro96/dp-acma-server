import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';

export class RoleRepository extends BaseRepository<Role> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(Role, entityManager);
  }
}
