import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PermissionService } from 'src/permission/services/permission.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { RolePermissionService } from 'src/role-permission/services/role-permission.service';
import { RoleService } from 'src/role/services/role.service';
import { UserRoleService } from 'src/user-role/services/user-role.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    UserService,
    RoleService,
    ConfigService,
    PermissionService,
    RolePermissionService,
    UserRoleService,
  ],
  controllers: [UserController],
})
export class UserModule {}
