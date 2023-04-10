import { Injectable } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ModuleService } from 'src/module/services/module.service';
import { Module } from 'src/repository/entities/module.entity';
import { UserModule } from 'src/repository/entities/user-module.entity';
import { User } from 'src/repository/entities/user.entity';
import { UserModuleRepository } from '../../repository/repositories/user-module/user-module.repository';
@Injectable()
export class UserModuleService {
  constructor(
    private readonly userModuleRepository: UserModuleRepository,
    private readonly moduleService: ModuleService,
  ) {}

  async create(executionCtx: Context, user: User, modules: Module[]): Promise<UserModule[]> {
    const userModules = modules.map((module) => {
      const newUserModule = new UserModule({
        user,
        module,
        createdAt: new Date(),
        createdBy: executionCtx.userId,
      });
      return this.userModuleRepository.create(newUserModule);
    });

    return await Promise.all(userModules);
  }

  async assignByUserId(executionCtx: Context, user: User, moduleNames: string[]): Promise<UserModule[]> {
    const modulesPromise = moduleNames.map((name) => this.moduleService.findByName(name));
    const modulesFound = await Promise.all(modulesPromise);

    await this.userModuleRepository.deleteByUserId(user.id);

    return await this.create(executionCtx, user, modulesFound);
  }
}
