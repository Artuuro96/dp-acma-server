import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [RepositoryModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
