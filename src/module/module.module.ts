import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { ModuleController } from './controllers/module.controller';
import { ModuleService } from './services/module.service';

@Module({
  imports: [RepositoryModule],
  providers: [ModuleService],
  controllers: [ModuleController],
})
export class ModuleModule {}
