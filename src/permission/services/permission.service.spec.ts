import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PermissionDTO } from 'src/dtos/permission.dto';
import { Permission } from 'src/repository/entities/permission.entity';
import { PermissionRepository } from 'src/repository/repositories/permission/permission.repository';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  let permissionService: PermissionService;
  let permissionDTOMock: PermissionDTO;
  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  const mockExcutionCtx = createMockExcutionCtx();

  const permissionsMock = [
    new Permission({
      id: 'id-1',
      name: 'permission-1',
      description: 'description mock',
      createdAt: new Date('2020-01-30T00:00:00.000-00:00'),
      createdBy: 'user-id',
    }),
    new Permission({
      id: 'id-2',
      name: 'permission-2',
      description: 'description mock',
      createdAt: new Date('2020-01-30T00:00:00.000-00:00'),
      createdBy: 'user-id',
    }),
  ];

  let permissionRepositoryMock: PermissionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        PermissionRepository,
        {
          provide: EntityManager,
          useFactory: entityManagerMock,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(Permission))
      .useValue(jest.fn())
      .compile();

    permissionDTOMock = {
      name: 'permission-1',
      description: 'description mock',
    };
    permissionService = module.get<PermissionService>(PermissionService);
    permissionRepositoryMock = module.get<PermissionRepository>(PermissionRepository);
  });

  describe('create', () => {
    it('should return the new permission created', async () => {
      permissionRepositoryMock.create = jest.fn().mockResolvedValue(permissionsMock[0]);
      const result = await permissionService.create(mockExcutionCtx, permissionDTOMock);
      expect(result).toBe(permissionsMock[0]);
    });
  });

  describe('update', () => {
    it('should return the new permission created', async () => {
      permissionRepositoryMock.update = jest.fn().mockResolvedValue(permissionsMock[0]);
      const result = await permissionService.update(mockExcutionCtx, 'id-1', permissionDTOMock);
      expect(result).toBe(permissionsMock[0]);
    });
  });

  describe('findById', () => {
    it('should return the new permission created', async () => {
      permissionRepositoryMock.findOneById = jest.fn().mockResolvedValue(permissionsMock[0]);
      const result = await permissionService.findById('id');
      expect(result).toBe(permissionsMock[0]);
    });
  });

  describe('findByIds', () => {
    it('should return the new permission created', async () => {
      permissionRepositoryMock.findByIds = jest.fn().mockResolvedValue(permissionsMock);
      const result = await permissionService.findByIds(['id-1', 'id-2']);
      expect(result).toBe(permissionsMock);
    });
  });

  describe('delete', () => {
    it('should return the new permission created', async () => {
      permissionRepositoryMock.delete = jest.fn();
      const result = await permissionService.delete(mockExcutionCtx, 'id-1');
      expect(result).toBe(undefined);
    });
  });
});
