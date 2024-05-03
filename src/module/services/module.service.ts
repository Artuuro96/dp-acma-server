import { Injectable, NotFoundException } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ModuleDTO } from 'src/dtos/module.dto';
import { Module } from 'src/repository/entities/module.entity';
import { ModuleRepository } from 'src/repository/repositories/module/module.repository';

@Injectable()
export class ModuleService {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async create(executionCtx: Context, moduleDTO: ModuleDTO): Promise<Module> {
    const newModule = new Module({
      ...moduleDTO,
      createdBy: executionCtx.userId,
      createdAt: new Date(),
    });
    return await this.moduleRepository.create(newModule);
  }
  async findAll(): Promise<Module[]> {
    return await this.moduleRepository.findAll();
  }

  async findByName(name: string): Promise<Module> {
    const queryResult = await this.moduleRepository.findByName(name);

    if (!queryResult) {
      throw new NotFoundException([`Module ${name} not found`, `Module ${name} no encontrado`]);
    }

    return queryResult;
  }

  async deleteById(executionCtx: Context, id: string): Promise<void> {
    await this.moduleRepository.delete(executionCtx, id);
  }
}
