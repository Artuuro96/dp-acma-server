import { Test } from '@nestjs/testing';
import { UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/repository/entities/user.entity';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { UserService } from './user.service';
import { genSaltSync, hash } from 'bcrypt';
import { RoleService } from 'src/role/services/role.service';
import { Role } from 'src/repository/entities/role.entity';
import { RoleRepository } from 'src/repository/repositories/role/role.repository';
import { PermissionService } from 'src/permission/services/permission.service';
import { ConfigService } from 'src/config/config.service';
import { PermissionRepository } from 'src/repository/repositories/permission/permission.repository';
jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let roleService: RoleService;
  let userRepository: UserRepository;
  let user: User;
  const executionCtx = createMockExcutionCtx();

  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  const mockGenSaltSync = genSaltSync as jest.Mock;
  const mockHash = hash as jest.Mock;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigService],
      providers: [
        UserRepository,
        RoleService,
        UserService,
        RoleRepository,
        PermissionRepository,
        PermissionService,
        ConfigService,
        {
          provide: EntityManager,
          useFactory: entityManagerMock,
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
    userRepository.findByName = jest.fn().mockResolvedValue(user);
    userRepository.findOne = jest.fn().mockResolvedValue(user);
    userRepository.create = jest.fn().mockResolvedValue(user);
    roleService.findByName = jest.fn().mockResolvedValue(
      new Role({
        id: 'id',
        name: 'name',
        description: 'description',
      }),
    );
  });

  describe('findByName', () => {
    it('should return the user found filtered by name', async () => {
      const result = await userService.findByName('name');
      expect(userRepository.findByName).toHaveBeenCalledWith('name');
      expect(result).toBe(user);
    });
  });

  describe('findOne', () => {
    it('should return the user found filtered by username', async () => {
      const result = await userService.findOne('username');
      expect(userRepository.findOne).toHaveBeenCalledWith('username');
      expect(result).toBe(user);
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
      };
      const result = await userService.create(executionCtx, userDTO);
      expect(userRepository.create).toHaveBeenCalled();
      expect(result).toBe(user);
    });
  });
});
