import { Test } from '@nestjs/testing';
import { Permission } from 'src/repository/entities/permission.entity';
import { RepositoryModule } from '../../repository/repository.module';
import { PermissionService } from '../services/permission.service';
import { PermissionController } from './permission.controller';

describe('PermissionController', () => {
  let permissionController: PermissionController;
  let permissionService: PermissionService;
  let mockPermissions: Permission[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [PermissionService],
      imports: [RepositoryModule],
    }).compile();

    permissionService = moduleRef.get<PermissionService>(PermissionService);
    permissionController = moduleRef.get<PermissionController>(PermissionController);

    mockPermissions = [
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

  describe('POST create', () => {
    it('should return the permission object created', async () => {
      permissionService.create = jest.fn().mockResolvedValue(mockPermissions[0]);
      const result = await permissionController.create({
        name: 'permission-1',
        description: 'descripton mock',
      });
      expect(permissionService.create).toHaveBeenCalledWith({
        name: 'permission-1',
        description: 'descripton mock',
      });
      expect(result).toBe(mockPermissions[0]);
    });
  });

  describe('GET findByIds', () => {
    it('should return the permission multiple permissions', async () => {
      permissionService.findByIds = jest.fn().mockResolvedValue(mockPermissions);
      const result = await permissionController.findByIds(['id-1', 'id-2']);
      expect(permissionService.findByIds).toHaveBeenCalledWith(['id-1', 'id-2']);
      expect(result).toBe(mockPermissions);
    });
  });

  describe('GET findById', () => {
    it('should return the permission found', async () => {
      permissionService.findById = jest.fn().mockResolvedValue(mockPermissions[0]);
      const result = await permissionController.findById('id-1');
      expect(permissionService.findById).toHaveBeenCalledWith('id-1');
      expect(result).toBe(mockPermissions[0]);
    });
  });

  describe('PATCH update', () => {
    it('should return the permission updated', async () => {
      permissionService.update = jest.fn().mockResolvedValue(mockPermissions[0]);
      const result = await permissionController.update('id-1', {
        name: 'update-name-mock',
        description: 'update-description',
      });
      expect(permissionService.update).toHaveBeenCalledWith('id-1', {
        name: 'update-name-mock',
        description: 'update-description',
      });
      expect(result).toBe(mockPermissions[0]);
    });
  });

  describe('DELETE delete', () => {
    it('should soft-delete the permission', async () => {
      permissionService.delete = jest.fn();
      await permissionController.delete('id-1');
      expect(permissionService.delete).toHaveBeenCalledWith('id-1');
    });
  });
});
