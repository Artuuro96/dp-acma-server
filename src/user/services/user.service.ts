import { Injectable } from '@nestjs/common';
import { UserUpdateDTO } from 'src/dtos/user-update.dto';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/repository/entities/user.entity';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'src/config/config.service';
import { RoleService } from 'src/role/services/role.service';
import { Context } from 'src/auth/context/execution-ctx';
import { UserRoleService } from 'src/user-role/services/user-role.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService,
    private readonly config: ConfigService,
  ) {}

  /**
   * @name findOneById
   * @param {string} id
   */
  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  /**
   * @name findOne
   * @param {string} username - username to look for
   * @returns {Promise<User>}
   */
  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneByUsername(username);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  /**
   * @name updateById
   * @param {Context} executionCtx
   * @param {id} id
   * @param {Partial<UserUpdateDTO>}
   * @returns {Promise<User>}
   */
  async updateById(executionCtx: Context, id: string, user: Partial<UserUpdateDTO>): Promise<User> {
    const userToUpdate = new User({
      ...user,
    });
    await this.userRepository.update(executionCtx, id, userToUpdate);
    const res = await this.userRepository.findOneById(id);
    return res;
  }

  async assignRolesByUserId(executionCtx: Context, id: string, roles: string[]): Promise<User> {
    //const userRoles = await this.roleService.findRolesByUserId(id);
    const rolesPromise = roles.map((rol) => {
      return this.roleService.findByName(rol);
    });
    const rolesFound = await Promise.all(rolesPromise);
    console.log(rolesFound);
    //await this.userRepository.update(executionCtx, id, { roles: rolesFound });
    return this.userRepository.findOneById(id);
  }

  /*async assignRoles(executionCtx: Context, id: string, roles: string[]): Promise<User> {
    const 
    console.log(rolesPromise);
    
    const userToUpdate = new User({
      ...user,
      roles: rolesFound,
    });
  }*/

  /**
   * @name create
   * @param {Context} executionCtx
   * @param {UserDTO} user - user data tranfer object to store on the DB
   * @returns {Promise<User>}
   */
  async create(executionCtx: Context, user: UserDTO): Promise<User> {
    const rolesPromise = user.roles.map((rol) => {
      return this.roleService.findByName(rol);
    });

    const rolesFound = await Promise.all(rolesPromise);
    const salt = bcrypt.genSaltSync(Number(this.config.get('SALT')));
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = new User();
    newUser.name = user.name;
    newUser.lastName = user.lastName;
    newUser.secondLastName = user.secondLastName;
    newUser.email = user.email;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.createdAt = new Date();
    newUser.createdBy = executionCtx.userId;

    const createdUser = await this.userRepository.create(newUser);
    await this.userRoleService.create(createdUser, rolesFound);

    return createdUser;
  }

  /**
   * @name delete
   * @param {Context} executionCtx
   * @param {id} id
   * @returns {Promise<void>}
   */
  async delete(executionCtx: Context, id: string): Promise<void> {
    return await this.userRepository.delete(executionCtx, id);
  }
}
