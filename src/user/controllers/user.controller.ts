import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/repository/entities/user.entity';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findByName(@Param('name') name: string): Promise<User> {
    return this.userService.findByName(name);
  }
}
