import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { PermissionModule } from './permission/permission.module';
import { RepositoryModule } from './repository/repository.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [RepositoryModule, ConfigModule, UserModule, RoleModule, PermissionModule, AuthModule],
})
export class AppModule {}
