import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Context } from 'src/auth/context/execution-ctx';
import { ExecutionCtx } from 'src/auth/decorators/execution-ctx.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/repository/entities/user.entity';
import { UserService } from '../services/user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findByName(@Param('name') name: string): Promise<User> {
    return this.userService.findByName(name);
  }

  @Post()
  async create(@ExecutionCtx() executionCtx: Context, @Body() user: UserDTO): Promise<User> {
    const userCreated = await this.userService.create(executionCtx, user);
    delete userCreated.password;
    return userCreated;
  }
}
