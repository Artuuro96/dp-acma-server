import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/repository/entities/user.entity';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'src/config/config.service';
import { RoleService } from 'src/role/services/role.service';
import { Context } from 'src/auth/context/execution-ctx';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    //private readonly roleService: RoleService,
    private readonly config: ConfigService,
  ) {}

  /**
   * @name findByName
   * @param {string} name - name to look for
   * @returns {Promise<User>}
   */
  async findByName(name: string): Promise<User> {
    return await this.userRepository.findByName(name);
  }

  /**
   * @name findOne
   * @param {string} username - username to look for
   * @returns {Promise<User>}
   */
  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne(username);
  }

  /**
   * @name create
   * @param {UserDTO} user - user data tranfer object to store on the DB
   * @returns {Promise<User>}
   */
  async create(executionCtx: Context, user: UserDTO): Promise<User> {
    /*const rolesPromise = user.roles.map((rol) => {
      return this.roleService.findByName(rol);
    });
    const rolesFound = await Promise.all(rolesPromise);*/
    const salt = bcrypt.genSaltSync(Number(this.config.get('SALT')));
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = new User({
      ...user,
      roles: [],
      createdAt: new Date(),
      createdBy: executionCtx.userId,
    });
    return await this.userRepository.create(newUser);
  }
}
