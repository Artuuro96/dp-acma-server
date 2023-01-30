import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';

@Module({
  imports: [RepositoryModule],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
