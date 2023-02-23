import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/ormconfig';
import { PermissionRepository } from './repositories/permission/permission.repository';
import { RolePermissionRepository } from './repositories/role-permission/role-permission.repository';
import { RoleRepository } from './repositories/role/role.repository';
import { UserRoleRepository } from './repositories/user-role/user-role.repository';
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [
    UserRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
    UserRoleRepository,
  ],
  exports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
    UserRoleRepository,
  ],
})
export class RepositoryModule {}
