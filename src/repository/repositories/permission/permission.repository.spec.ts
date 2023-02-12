import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Permission } from 'src/repository/entities/permission.entity';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { PermissionRepository } from './permission.repository';

describe('PermissionRepositry', () => {
  let entityManager: EntityManager;
  let permissionRepository: PermissionRepository;
  let permission: Permission;

  const mockExcutionCtx = createMockExcutionCtx();

  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: EntityManager,
          useFactory: entityManagerMock,
        },
      ],
    }).compile();

    entityManager = moduleRef.get<EntityManager>(EntityManager);
    permissionRepository = new PermissionRepository(entityManager);
    queryBuilderMock = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
    };
    permission = new Permission({
      id: 'id',
      name: 'name',
      description: 'description',
      createdAt: new Date(),
      createdBy: 'uuid',
      deleted: false,
    });
  });

  beforeAll(async () => {
    queryBuilderMock.getOne = jest.fn().mockResolvedValue(permission);
    entityManager.createQueryBuilder = jest.fn().mockImplementation(() => queryBuilderMock);
  });

  describe('findByName', () => {
    it('should return the permission found', async () => {
      const result = await permissionRepository.findByName(mockExcutionCtx, 'name');
      expect(result).toBe(permission);
    });

    it('should throw NotFoundException when no result are retrieved', async () => {
      queryBuilderMock.getOne = jest.fn().mockResolvedValue(undefined);
      await expect(permissionRepository.findByName(mockExcutionCtx, 'name')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
