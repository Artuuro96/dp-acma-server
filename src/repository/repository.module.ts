import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/ormconfig';
import { PermissionRepository } from './repositories/permission/permission.repository';
import { RoleRepository } from './repositories/role/role.repository';
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [UserRepository, RoleRepository, PermissionRepository],
  exports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserRepository,
    RoleRepository,
    PermissionRepository,
  ],
})
export class RepositoryModule {}
