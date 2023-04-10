import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/ormconfig';
import { ModuleRepository } from './repositories/module/module.repository';
import { PermissionRepository } from './repositories/permission/permission.repository';
import { RolePermissionRepository } from './repositories/role-permission/role-permission.repository';
import { RoleRepository } from './repositories/role/role.repository';
import { UserModuleRepository } from './repositories/user-module/user-module.repository';
import { UserRoleRepository } from './repositories/user-role/user-role.repository';
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [
    UserRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
    UserModuleRepository,
    UserRoleRepository,
    ModuleRepository,
  ],
  exports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
    UserModuleRepository,
    UserRoleRepository,
    ModuleRepository,
  ],
})
export class RepositoryModule {}
