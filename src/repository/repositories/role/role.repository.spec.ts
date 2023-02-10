import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Role } from 'src/repository/entities/role.entity';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { RoleRepository } from './role.repository';

describe('RoleRepository', () => {
  let entityManager: EntityManager;
  let roleRepository: RoleRepository;
  let role: Role;

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
    roleRepository = new RoleRepository(entityManager);
    role = new Role({
      id: 'id',
      name: 'name',
      description: 'description',
      createdAt: new Date(),
      createdBy: mockExcutionCtx.userId,
      deleted: true,
    });
  });

  beforeEach(async () => {
    queryBuilderMock = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
    };
    entityManager.findOne = jest.fn().mockResolvedValue(role);
  });

  describe('findByName', () => {
    it('should return the role found by name', async () => {
      const result = await roleRepository.findByName('name');
      expect(entityManager.findOne).toHaveBeenCalledWith(Role, {
        where: {
          name: 'name',
        },
      });
      expect(result).toBe(role);
    });

    it('should throw error when there is not role found', async () => {
      entityManager.findOne = jest.fn().mockResolvedValue(undefined);
      await expect(roleRepository.findByName('name')).rejects.toThrowError(NotFoundException);
    });
  });
});
