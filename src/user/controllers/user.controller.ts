import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ExecutionCtx } from 'src/auth/decorators/execution-ctx.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserUpdateDTO } from 'src/dtos/user-update.dto';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/repository/entities/user.entity';
import { UserService } from '../services/user.service';
import { AuthorizeGuard } from '../../auth/guards/authorize.guard';
import { ModulesAssignedDTO } from 'src/dtos/modules-assigned.dto';
import { RolesAssignedDTO } from 'src/dtos/roles-assigned.dto';

@UseGuards(JwtAuthGuard, AuthorizeGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('findMany')
  async findMany(@Query('userIds') ids: string[]): Promise<User[]> {
    return await this.userService.findManyByIds(ids);
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @Get()
  //@Authorize('users:findAll')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@ExecutionCtx() executionCtx: Context, @Body() user: UserDTO): Promise<User> {
    const userCreated = await this.userService.create(executionCtx, user);
    delete userCreated.password;
    return userCreated;
  }

  @Patch('/:id')
  async update(
    @ExecutionCtx() executionCtx: Context,
    @Param('id') id: string,
    @Body() user: Partial<UserUpdateDTO>,
  ): Promise<User> {
    return await this.userService.updateById(executionCtx, id, user);
  }

  @Patch('/:id/assign/roles')
  async assignRolesByUserId(
    @ExecutionCtx() executionCtx: Context,
    @Param('id') id: string,
    @Body('roles') roles: RolesAssignedDTO[],
  ): Promise<User> {
    return await this.userService.assignRolesByUserId(executionCtx, id, roles);
  }

  @Patch('/:id/assign/modules')
  async assignModulesByUserId(
    @ExecutionCtx() executionCtx: Context,
    @Param('id') id: string,
    @Body('modules') modules: ModulesAssignedDTO[],
  ): Promise<User> {
    return await this.userService.assignModulesByUserId(executionCtx, id, modules);
  }

  @Delete('/:id')
  async delete(@ExecutionCtx() executionCtx: Context, @Param('id') id: string): Promise<{ id: string }> {
    await this.userService.delete(executionCtx, id);
    return { id };
  }
}
