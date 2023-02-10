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
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy, PermissionService],
  exports: [AuthService],
})
export class AuthModule {}
