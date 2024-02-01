import { Test } from '@nestjs/testing';
import { UserDTO } from 'src/dtos/user.dto';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { UserService } from './user.service';
import { genSaltSync, hash } from 'bcrypt';
import { RoleService } from 'src/role/services/role.service';
import { Role, User, UserRole, UserModule, Module } from 'src/repository/entities';
import { PermissionService } from 'src/permission/services/permission.service';
import { ConfigService } from 'src/config/config.service';
import { PermissionRepository } from 'src/repository/repositories/permission/permission.repository';
import { RolePermissionService } from 'src/role-permission/services/role-permission.service';
import { UserRoleService } from 'src/user-role/services/user-role.service';
import { UserModuleService } from 'src/user-module/services/user-module.service';
import { ModuleService } from 'src/module/services/module.service';
import {
  RoleRepository,
  RolePermissionRepository,
  UserModuleRepository,
  UserRoleRepository,
  ModuleRepository,
} from 'src/repository/repositories';

jest.mock('bcrypt');

describe('UserService', () => {
  let user: User;
  let roles: Role[];
  let module: Module;
  let userRole: UserRole;
  let userModule: UserModule;
  let userService: UserService;
  let roleService: RoleService;
  let userRepository: UserRepository;
  let userRoleService: UserRoleService;
  let userModuleService: UserModuleService;

  const executionCtx = createMockExcutionCtx();
  const configService = {
    get: jest.fn().mockReturnValue('ENV'),
  };

  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  const mockGenSaltSync = genSaltSync as jest.Mock;
  const mockHash = hash as jest.Mock;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        RoleService,
        ConfigService,
        UserService,
        RolePermissionService,
        PermissionService,
        UserRoleService,
        UserModuleService,
        UserRoleRepository,
        UserModuleRepository,
        RolePermissionRepository,
        PermissionRepository,
        ModuleRepository,
        RoleRepository,
        RoleRepository,
        UserRepository,
        ModuleService,
        ConfigService,
        {
          provide: EntityManager,
          useFactory: entityManagerMock,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2020-01-30T00:00:00.000-00:00'));
    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    roleService = moduleRef.get<RoleService>(RoleService);
    mockGenSaltSync.mockImplementation(() => 'salt');
    mockHash.mockImplementation(() => 'hash');
  });

  beforeEach(async () => {
    user = new User({
      id: 'id',
      name: 'name',
      createdBy: 'uuid',
      deleted: false,
    });

    roles = [
      new Role({
        id: 'role-2',
        name: 'name',
        description: 'description',
      }),
      new Role({
        id: 'role-1',
        name: 'name',
        description: 'description',
      }),
    ];

    module = new Module({
      id: 'id',
      name: 'module name',
    });

    userRole = new UserRole({
      id: 'id',
      user: user,
      role: roles[0],
    });

    userModule = new UserModule({
      id: 'id',
      user,
      module,
    });

    userRepository.findOneByUsername = jest.fn().mockResolvedValue(user);
    userRepository.findOneById = jest.fn().mockResolvedValue(user);
    userRepository.create = jest.fn().mockResolvedValue(user);
    userRepository.findAll = jest.fn().mockResolvedValue([user]);
    userRoleService.create = jest.fn().mockResolvedValue([userRole]);
    userModuleService.create = jest.fn().mockResolvedValue([userModule]);
    roleService.findByName = jest.fn().mockResolvedValueOnce(roles[0]).mockResolvedValue(roles[1]);
  });

  describe('findOneById', () => {
    it('should return the user found filtered by name', async () => {
      const result = await userService.findOneById('id');
      expect(userRepository.findOneById).toHaveBeenCalledWith('id');
      expect(result).toBe(user);
    });
  });

  describe('findOneByUsername', () => {
    it('should return the user found filtered by username', async () => {
      const result = await userService.findOneByUsername('username');
      expect(userRepository.findOneByUsername).toHaveBeenCalledWith('username');
      expect(result).toBe(user);
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const result = await userService.findAll();
      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toMatchObject([user]);
    });
  });

  describe('create', () => {
    it('should create and return the user created', async () => {
      const userDTO: UserDTO = {
        name: 'Arturo',
        lastName: 'Rodriguez',
        secondLastName: 'Olvera',
        email: 'arturorodr96@gmail.com',
        roles: ['role-1', 'role-2'],
        password: '1234',
        username: 'arturo96',
        active: false,
        modules: [],
      };
      const result = await userService.create(executionCtx, userDTO);
      expect(roleService.findByName).toHaveBeenNthCalledWith(1, 'role-1');
      expect(roleService.findByName).toHaveBeenNthCalledWith(2, 'role-2');
      expect(userRepository.create).toHaveBeenCalledWith({
        name: 'Arturo',
        lastName: 'Rodriguez',
        secondLastName: 'Olvera',
        email: 'arturorodr96@gmail.com',
        roles: roles,
        password: 'hash',
        username: 'arturo96',
        active: false,
        createdAt: new Date(),
        createdBy: 'userId',
      });
      expect(result).toBe(user);
    });
  });
});
