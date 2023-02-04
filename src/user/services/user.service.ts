import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/repository/entities/user.entity';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   *
   * @param {string} name
   * @returns
   */
  async findByName(name: string): Promise<User> {
    return await this.userRepository.findByName(name);
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne(username);
  }
  /**
   *
   * @param {UserDTO} user
   * @returns
   */
  async create(user: UserDTO): Promise<User> {
    const newUser = new User({
      ...user,
      createdAt: new Date(),
      createdBy: uuidv4(),
    });
    return await this.userRepository.create(newUser);
  }
}
