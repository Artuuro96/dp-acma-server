import { Module } from '@nestjs/common';
import { databaseConfig } from 'src/database/database.config';
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [...databaseConfig],
  providers: [UserRepository],
  exports: [...databaseConfig, UserRepository],
})
export class RepositoryModule {}
