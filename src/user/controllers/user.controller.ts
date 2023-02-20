import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ExecutionCtx } from 'src/auth/decorators/execution-ctx.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserUpdateDTO } from 'src/dtos/user-update.dto';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/repository/entities/user.entity';
import { UserService } from '../services/user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOneById(id);
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

  @Patch('assign/roles')
  async assignRolesByUserId(
    @ExecutionCtx() executionCtx: Context,
    @Param('id') id: string,
    @Body('roles') roles: string[],
  ): Promise<User> {
    return await this.userService.assignRolesByUserId(executionCtx, id, roles);
  }

  @Delete('/:id')
  async delete(@ExecutionCtx() executionCtx: Context, @Param('id') id: string): Promise<void> {
    return await this.userService.delete(executionCtx, id);
  }
}
