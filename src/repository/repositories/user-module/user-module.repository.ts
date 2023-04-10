import { InjectEntityManager } from '@nestjs/typeorm';
import { UserModule } from 'src/repository/entities/user-module.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';

export class UserModuleRepository extends BaseRepository<UserModule> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(UserModule, entityManager);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.entityManager
      .createQueryBuilder(UserModule, 'userModule')
      .delete()
      .where('user_id = :userId', { userId })
      .execute();
  }
}
