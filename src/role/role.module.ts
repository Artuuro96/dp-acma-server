import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  imports: [RepositoryModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
