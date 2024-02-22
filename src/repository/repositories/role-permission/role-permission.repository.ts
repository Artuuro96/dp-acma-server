import { InjectEntityManager } from '@nestjs/typeorm';
import { RolePermission } from 'src/repository/entities/role-permission.entity';
import { EntityManager } from 'typeorm';
import { BaseRepository } from '../base/base.repository';

export class RolePermissionRepository extends BaseRepository<RolePermission> {
  constructor(@InjectEntityManager() protected entityManager: EntityManager) {
    super(RolePermission, entityManager);
  }

  async deleteByRoleId(roleId: string): Promise<void> {
    await this.entityManager
      .createQueryBuilder(RolePermission, 'rolePermission')
      .delete()
      .where('role_id = :roleId', { roleId })
      .execute();
  }
}
