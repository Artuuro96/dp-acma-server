import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Context } from 'src/auth/context/execution-ctx';
import { RoleDTO } from 'src/dtos/role.dto';
import { PermissionService } from 'src/permission/services/permission.service';
import { PermissionRepository } from 'src/repository/repositories/permission/permission.repository';
import { RoleRepository } from 'src/repository/repositories/role/role.repository';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { Role } from '../../repository/entities/role.entity';
import { RoleService } from '../services/role.service';
import { RoleController } from './role.controller';

describe('RoleController', () => {
  let roleService: RoleService;
  let roleController: RoleController;
  let permissionService: PermissionService;
  let role: Role;
  let roleDTO: RoleDTO;

  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  const mockExcutionCtx = createMockExcutionCtx();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        RoleService,
        PermissionService,
        RoleRepository,
        PermissionRepository,
        {
          provide: EntityManager,
          useFactory: entityManagerMock,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(Role))
      .useValue(jest.fn())
      .compile();

    permissionService = moduleRef.get<PermissionService>(PermissionService);
    roleController = moduleRef.get<RoleController>(RoleController);
    roleService = moduleRef.get<RoleService>(RoleService);
    roleDTO = {
      name: 'role',
      permissions: ['id-1', 'id-2'],
      description: 'description mock',
    };
    role = new Role({
      name: 'role',
      description: 'description mock',
      createdAt: new Date('2020-01-30T00:00:00.000-00:00'),
      createdBy: 'role-id',
    });
  });

  describe('POST create', () => {
    it('should return the role created', async () => {
      roleService.create = jest.fn().mockResolvedValue(role);
      const result = await roleController.create(mockExcutionCtx, roleDTO);
      expect(result).toStrictEqual(role);
    });
  });
});
