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
import { ModuleService } from 'src/module/services/module.service';
import { UserModuleService } from 'src/user-module/services/user-module.service';
import { RolesAssignedDTO } from 'src/dtos/roles-assigned.dto';
import { ModulesAssignedDTO } from 'src/dtos/modules-assigned.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleService: UserRoleService,
    private readonly userModuleService: UserModuleService,
    private readonly roleService: RoleService,
    private readonly moduleService: ModuleService,
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

  async findManyByIds(ids: string[]): Promise<User[]> {
    return await this.userRepository.findManyByIds(ids);
  }

  /**
   * @name updateById
   * @param {Context} executionCtx
   * @param {id} id
   * @param {Partial<UserUpdateDTO>}
   * @returns {Promise<User>}
   */
  async updateById(executionCtx: Context, id: string, user: Partial<UserUpdateDTO>): Promise<User> {
    let rolesFound, modulesFound;
    if (user.roles && user.roles.length > 0) {
      const rolesPromise = user?.roles?.map((role) => {
        return this.roleService.findByName(role.name);
      });
      rolesFound = await Promise.all(rolesPromise);
    }

    if (user.modules && user.modules.length > 0) {
      const modulesPromise = user?.modules?.map((module) => {
        return this.moduleService.findByName(module.name);
      });

      modulesFound = await Promise.all(modulesPromise);
    }

    const userToUpdate = new User({
      ...user,
      roles: rolesFound,
      modules: modulesFound,
    });

    await this.userRepository.update(executionCtx, id, userToUpdate);
    const res = await this.userRepository.findOneById(id);
    return res;
  }

  async assignRolesByUserId(executionCtx: Context, id: string, roles: RolesAssignedDTO[]): Promise<User> {
    const user = await this.findOneById(id);
    const roleNames = roles.map((role) => role.name);
    await this.userRoleService.assignByUserId(executionCtx, user, roleNames);
    return user;
  }

  async assignModulesByUserId(
    executionCtx: Context,
    id: string,
    modules: ModulesAssignedDTO[],
  ): Promise<User> {
    const user = await this.findOneById(id);
    const moduleNames = modules.map((module) => module.name);
    await this.userModuleService.assignByUserId(executionCtx, user, moduleNames);
    return user;
  }

  /**
   * @name create
   * @param {Context} executionCtx
   * @param {UserDTO} user - user data tranfer object to store on the DB
   * @returns {Promise<User>}
   */
  async create(executionCtx: Context, user: UserDTO): Promise<User> {
    const rolesPromise = user.roles.map((role) => {
      return this.roleService.findByName(role.name);
    });

    const rolesFound = await Promise.all(rolesPromise);

    const modulesPromise = user.modules.map((module) => {
      return this.moduleService.findByName(module.name);
    });

    const modulesFound = await Promise.all(modulesPromise);

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
    await this.userRoleService.create(executionCtx, createdUser, rolesFound);
    await this.userModuleService.create(executionCtx, createdUser, modulesFound);

    return await this.userRepository.findOneById(createdUser.id);
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
