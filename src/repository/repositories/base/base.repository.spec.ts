import { Test, TestingModule } from '@nestjs/testing';
import { Permission } from 'src/repository/entities/permission.entity';
import { createMockExcutionCtx } from 'test/testing.utils';
import { EntityManager } from 'typeorm';
import { BaseRepository } from './base.repository';

describe('BaseRepository', () => {
  //let permissionRepository: PermissionRepository;
  let baseRepository: BaseRepository<Permission>;
  let entityManager: EntityManager;
  let permissionsMock: Permission[];
  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;
  const mockExcutionCtx = createMockExcutionCtx();
  let idsMock: string[];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EntityManager,
          useFactory: entityManagerMock,
        },
      ],
    }).compile();
    //permissionRepository = module.get<PermissionRepository>(PermissionRepository);
    entityManager = module.get<EntityManager>(EntityManager);
    baseRepository = new BaseRepository(Permission, entityManager);
    queryBuilderMock = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
    };
    idsMock = ['id-1', 'id-2'];
  });

  beforeEach(() => {
    permissionsMock = [
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
  });

  describe('create', () => {
    it('should create the new permission', async () => {
      entityManager.save = jest.fn().mockResolvedValue(permissionsMock[0]);
      const result = await baseRepository.create(permissionsMock[0]);
      expect(entityManager.save).toHaveBeenCalledWith(permissionsMock[0]);
      expect(result).toBe(permissionsMock[0]);
    });
  });

  describe('findByIds', () => {
    it('should return the permissions found', async () => {
      queryBuilderMock.execute = jest.fn().mockResolvedValue(permissionsMock);
      entityManager.createQueryBuilder = jest.fn().mockImplementation(() => queryBuilderMock);
      const result = await baseRepository.findByIds(['id-1', 'id-2']);
      expect(queryBuilderMock.select).toHaveBeenCalled();
      expect(queryBuilderMock.from).toHaveBeenCalledWith(Permission, Permission.name);
      expect(queryBuilderMock.where).toHaveBeenCalledWith('id = ANY(:ids)', { ids: idsMock });
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('deleted = false');
      expect(queryBuilderMock.execute).toHaveBeenCalled();
      expect(result).toBe(permissionsMock);
    });
  });

  describe('findById', () => {
    it('should return the permission found', async () => {
      queryBuilderMock.getRawOne = jest.fn().mockResolvedValue(permissionsMock[0]);
      entityManager.createQueryBuilder = jest.fn().mockImplementation(() => queryBuilderMock);
      const result = await baseRepository.findOneById('id-1');

      expect(queryBuilderMock.select).toHaveBeenCalled();
      expect(queryBuilderMock.from).toHaveBeenCalledWith(Permission, Permission.name);
      expect(queryBuilderMock.where).toHaveBeenCalledWith('id = :id', { id: idsMock[0] });
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('deleted = false');
      expect(queryBuilderMock.getRawOne).toHaveBeenCalled();
      expect(result).toBe(permissionsMock[0]);
    });
  });

  describe('update', () => {
    it('should return the permission updated', async () => {
      queryBuilderMock.update = jest.fn().mockReturnThis();
      queryBuilderMock.set = jest.fn().mockReturnThis();
      queryBuilderMock.execute = jest.fn().mockResolvedValue(permissionsMock[0]);
      entityManager.createQueryBuilder = jest.fn().mockImplementation(() => queryBuilderMock);

      await baseRepository.update(mockExcutionCtx, 'id-1', {
        name: 'name mock',
        description: 'description mock',
      });

      expect(queryBuilderMock.update).toHaveBeenCalledWith(Permission);
      expect(queryBuilderMock.set).toHaveBeenCalled();
      expect(queryBuilderMock.where).toHaveBeenCalledWith('id = :id', { id: idsMock[0] });
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('deleted = false');
      expect(queryBuilderMock.getRawOne).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should sotf-delete the permission', async () => {
      queryBuilderMock.update = jest.fn().mockReturnThis();
      queryBuilderMock.set = jest.fn().mockReturnThis();
      queryBuilderMock.execute = jest.fn().mockResolvedValue(permissionsMock[0]);
      entityManager.createQueryBuilder = jest.fn().mockImplementation(() => queryBuilderMock);

      await baseRepository.delete(mockExcutionCtx, 'id-1');

      expect(queryBuilderMock.update).toHaveBeenCalledWith(Permission);
      expect(queryBuilderMock.set).toHaveBeenCalled();
      expect(queryBuilderMock.where).toHaveBeenCalledWith('id = :id', { id: idsMock[0] });
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('deleted = false');
      expect(queryBuilderMock.getRawOne).toHaveBeenCalled();
    });
  });
});
