import { InjectEntityManager } from '@nestjs/typeorm';
import { UserRole } from 'src/repository/entities/user-role.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';

export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(UserRole, entityManager);
  }
}
