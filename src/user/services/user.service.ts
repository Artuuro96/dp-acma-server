import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
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
    return await this.userRepository.findByName(name);
  }

  /**
   *
   * @param {UserDTO}        user        -user data transfer object to be created
   * @returns
   */
  async create(user: UserDTO): Promise<User> {
    const newUser = new User({
      ...user,
      createdAt: new Date(),
      createdBy: 'arturo',
    });
    return await this.userRepository.create(newUser);
  }
}
