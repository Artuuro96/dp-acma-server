import { InjectEntityManager } from '@nestjs/typeorm';
import { UserModule } from 'src/repository/entities/user-module.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';

export class UserModulesRepository extends BaseRepository<UserModule> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(UserModule, entityManager);
  }
}
