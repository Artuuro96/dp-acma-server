import { Module } from '@nestjs/common';
import { PermissionService } from 'src/permission/services/permission.service';
import { RepositoryModule } from '../repository/repository.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [RepositoryModule],
  providers: [RoleService, PermissionService],
  controllers: [RoleController],
})
export class RoleModule {}
