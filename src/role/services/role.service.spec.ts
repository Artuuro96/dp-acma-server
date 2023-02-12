import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleDTO } from 'src/dtos/role.dto';
import { PermissionService } from 'src/permission/services/permission.service';
import { Permission } from 'src/repository/entities/permission.entity';
import { Role } from 'src/repository/entities/role.entity';
import { PermissionRepository } from 'src/repository/repositories/permission/permission.repository';
import { RoleRepository } from 'src/repository/repositories/role/role.repository';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let permissionService: PermissionService;
  let roleService: RoleService;
  let roleRepository: RoleRepository;
  let roleDTO: RoleDTO;
  let roles: Role[];
  let permissions: Permission[];

  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  const mockExcutionCtx = createMockExcutionCtx();

  beforeAll(async () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-30T00:00:00.000-00:00'));

    const moduleRef = await Test.createTestingModule({
      providers: [
        RoleService,
        RoleRepository,
        PermissionService,
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

    permissions = [
      new Permission({
        id: 'id-1',
        name: 'name-1',
        createdAt: new Date('2020-01-30T00:00:00.000-00:00'),
        createdBy: mockExcutionCtx.userId,
      }),
      new Permission({
        id: 'id-2',
        name: 'name-2',
        createdAt: new Date('2020-01-30T00:00:00.000-00:00'),
        createdBy: mockExcutionCtx.userId,
      }),
    ];
    roles = [
      new Role({
        name: 'name',
        description: 'description',
        permissions: permissions,
        createdBy: mockExcutionCtx.userId,
        createdAt: new Date('2020-01-30T00:00:00.000-00:00'),
      }),
    ];
    permissionService = moduleRef.get<PermissionService>(PermissionService);
    roleRepository = moduleRef.get<RoleRepository>(RoleRepository);
    roleService = moduleRef.get<RoleService>(RoleService);
    moduleRef.get<RoleService>(RoleService);
    permissionService.findByName = jest
      .fn()
      .mockResolvedValueOnce(permissions[0])
      .mockResolvedValueOnce(permissions[1]);
    roleRepository.create = jest.fn().mockReturnValue(roles[0]);
    roleRepository.findByName = jest.fn().mockReturnValue(roles[0]);
    roleDTO = {
      name: 'name',
      description: 'description',
      permissions: ['id-1', 'id-2'],
    };
  });

  describe('create', () => {
    it('should create and return the new role', async () => {
      const result = await roleService.create(mockExcutionCtx, roleDTO);
      expect(permissionService.findByName).toHaveBeenCalledTimes(2);
      expect(roleRepository.create).toHaveBeenCalledWith(roles[0]);
      expect(result).toBeDefined();
    });
  });

  describe('findByName', () => {
    it('should return the role found by name', async () => {
      const result = await roleService.findByName('name');
      expect(roleRepository.findByName).toHaveBeenCalledWith('name');
      expect(result).toBeDefined();
    });
  });
});
