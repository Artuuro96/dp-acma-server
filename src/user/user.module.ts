import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PermissionService } from 'src/permission/services/permission.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { RoleService } from 'src/role/services/role.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [RepositoryModule],
  providers: [UserService, RoleService, ConfigService, PermissionService],
  controllers: [UserController],
})
export class UserModule {}
