import { Injectable } from '@nestjs/common';
import { User } from 'src/repository/entities/user.entity';
import { UserRepository } from 'src/repository/repositories/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   *
   * @param {string}         name        -name of the user
   * @returns
   */
  async findByName(name: string): Promise<User> {
    return this.userRepository.findByName(name);
  }
}
