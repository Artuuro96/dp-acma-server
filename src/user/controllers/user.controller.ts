import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/repository/entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findByName(@Param('name') name: string): Promise<User> {
    return this.userService.findByName(name);
  }

  @Post()
  async create(@Body() user: UserDTO): Promise<User> {
    return await this.userService.create(user);
  }
}
