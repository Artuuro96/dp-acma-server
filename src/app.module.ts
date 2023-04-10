import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { CorrelationIdMiddleware } from './middlewares/correlation-id.middleware';
import { ModuleModule } from './module/module.module';
import { PermissionModule } from './permission/permission.module';
import { RepositoryModule } from './repository/repository.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RepositoryModule,
    ConfigModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    HealthModule,
    ModuleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
