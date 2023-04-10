import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PermissionService } from 'src/permission/services/permission.service';
import { PermissionModule } from 'src/permission/permission.module';
import { RoleService } from 'src/role/services/role.service';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { RolePermissionService } from 'src/role-permission/services/role-permission.service';
import { UserRoleService } from 'src/user-role/services/user-role.service';
import { ModuleService } from 'src/module/services/module.service';
import { UserModuleService } from 'src/user-module/services/user-module.service';

@Module({
  imports: [
    PermissionModule,
    UserModule,
    PassportModule,
    RepositoryModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('SECRET_TOKEN'),
          signOptions: {
            expiresIn: config.get('EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    RefreshJwtStrategy,
    PermissionService,
    RoleService,
    RolePermissionService,
    UserRoleService,
    UserModuleService,
    ModuleService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
