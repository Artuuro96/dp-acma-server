import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ExecutionCtx } from 'src/auth/decorators/execution-ctx.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModuleDTO } from 'src/dtos/module.dto';
import { Module } from 'src/repository/entities/module.entity';
import { ModuleService } from '../services/module.service';

@Controller('module')
@UseGuards(JwtAuthGuard)
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  async create(@ExecutionCtx() executionCtx: Context, @Body() moduleDTO: ModuleDTO): Promise<Module> {
    return await this.moduleService.create(executionCtx, moduleDTO);
  }

  @Get()
  async findAll(): Promise<Module[]> {
    return await this.moduleService.findAll();
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<Module> {
    return await this.moduleService.findByName(name);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@ExecutionCtx() executionCtx: Context, @Param('id') id: string): Promise<void> {
    await this.moduleService.deleteById(executionCtx, id);
  }
}
