import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from 'src/repository/entities/user.entity';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let entityManager: EntityManager;
  let userRepository: UserRepository;
  let user: User;

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
    userRepository = new UserRepository(entityManager);
    user = new User({
      id: 'id',
      name: 'name',
      lastName: 'lastName',
      secondLastName: 'second',
      createdAt: new Date(),
      createdBy: mockExcutionCtx.userId,
      deleted: false,
    });
  });

  beforeEach(async () => {
    queryBuilderMock = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
    };
    queryBuilderMock.getOne = jest.fn().mockResolvedValue(user);
    entityManager.createQueryBuilder = jest.fn().mockImplementation(() => queryBuilderMock);
  });

  describe('findByName', () => {
    it('should return the user found by name', async () => {
      const result = await userRepository.findByName('name');
      expect(queryBuilderMock.select).toHaveBeenCalledWith('user');
      expect(queryBuilderMock.where).toHaveBeenCalledWith('user.name = :name', { name: 'name' });
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('user.deleted = false');
      expect(queryBuilderMock.getOne).toHaveBeenCalled();
      expect(result).toBe(user);
    });

    it('should throw error when the user is not found', async () => {
      queryBuilderMock.getOne = jest.fn().mockResolvedValue(undefined);
      await expect(userRepository.findByName('name')).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return the user found by username', async () => {
      const result = await userRepository.findOne('username');
      expect(queryBuilderMock.select).toHaveBeenCalledWith('user');
      expect(queryBuilderMock.where).toHaveBeenCalledWith('user.username = :username', {
        username: 'username',
      });
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('user.deleted = false');
      expect(queryBuilderMock.getOne).toHaveBeenCalled();
      expect(result).toBe(user);
    });

    it('should return the user found by username', async () => {
      queryBuilderMock.getOne = jest.fn().mockResolvedValue(undefined);
      await expect(userRepository.findOne('username')).rejects.toThrowError(NotFoundException);
    });
  });
});
