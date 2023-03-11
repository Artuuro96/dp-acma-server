import { Injectable } from '@nestjs/common';
import { Module } from 'src/repository/entities/module.entity';
import { UserModule } from 'src/repository/entities/user-module.entity';
import { User } from 'src/repository/entities/user.entity';
import { UserModuleRepository } from '../../repository/repositories/user-module/user-module.repository';
@Injectable()
export class UserModuleService {
  constructor(private readonly userModuleRepository: UserModuleRepository) {}

  async create(user: User, modules: Module[]): Promise<UserModule[]> {
    const userModules = modules.map((module) => {
      const newUserModule = new UserModule({
        user,
        module,
      });
      return this.userModuleRepository.create(newUserModule);
    });

    return await Promise.all(userModules);
  }
}
