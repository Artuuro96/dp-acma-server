import { Module } from '@nestjs/common';
import { PermissionService } from 'src/permission/services/permission.service';
import { RolePermissionService } from 'src/role-permission/services/role-permission.service';
import { RepositoryModule } from '../repository/repository.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [RepositoryModule],
  providers: [RoleService, PermissionService, RolePermissionService],
  controllers: [RoleController],
})
export class RoleModule {}
