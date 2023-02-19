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

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post()
  async create(@ExecutionCtx() executionCtx: Context, @Body() user: UserDTO): Promise<User> {
    const userCreated = await this.userService.create(executionCtx, user);
    delete userCreated.password;
    return userCreated;
  }
}
