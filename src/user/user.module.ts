import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [RepositoryModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
