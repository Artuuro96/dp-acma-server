import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { UserDTO } from 'src/dtos/user.dto';
import { PermissionService } from 'src/permission/services/permission.service';
import { User } from 'src/repository/entities/user.entity';
import { PermissionRepository } from 'src/repository/repositories/permission/permission.repository';
import { RoleRepository } from 'src/repository/repositories/role/role.repository';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import { RoleService } from 'src/role/services/role.service';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;
  const executionCtx = createMockExcutionCtx();
  const userDTO: UserDTO = {
    name: 'name',
    lastName: 'lastName',
    secondLastName: 'secondLastName',
  } as any;
  const user = new User({
    id: 'id',
    name: 'name',
    lastName: 'lastName',
    roles: [
      {
        id: 'id',
        name: 'name',
        description: 'description',
        createdAt: new Date(),
        createdBy: executionCtx.userId,
      },
    ] as any,
  });

  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository,
        PermissionService,
        ConfigService,
        PermissionRepository,
        RoleService,
        RoleRepository,
        {
          provide: EntityManager,
          useFactory: entityManagerMock,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(jest.fn())
      .compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    userService.create = jest.fn().mockResolvedValue(user);
  });

  describe('findByName', () => {
    it('should return the user found by name', async () => {
      userService.findByName = jest.fn().mockResolvedValue(user);
      const result = await userController.findByName('name');
      expect(userService.findByName).toHaveBeenCalledWith('name');
      expect(result).toBe(user);
    });
  });

  describe('create', () => {
    it('should return the user found by name', async () => {
      userService.create = jest.fn().mockResolvedValue(user);
      const result = await userController.create(executionCtx, userDTO);
      expect(userService.create).toHaveBeenCalledWith(executionCtx, userDTO);
      expect(result).toBe(user);
    });
  });
});
