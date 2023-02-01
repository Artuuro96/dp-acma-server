import { Test } from '@nestjs/testing';
import { PermissionDTO } from '../../dtos/permission.dto';
import { RepositoryModule } from '../../repository/repository.module';
import { PermissionService } from '../services/permission.service';
import { PermissionController } from './permission.controller';

describe('PermissionController', () => {
  let permissionController: PermissionController;
  let permissionService: PermissionService;
  let mockPermissionDTO: PermissionDTO;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [PermissionService],
      imports: [RepositoryModule],
    }).compile();

    permissionService = moduleRef.get<PermissionService>(PermissionService);
    permissionController =
      moduleRef.get<PermissionController>(PermissionController);

    mockPermissionDTO = {
      name: 'name',
      description: 'description mock',
    };
  });

  describe('POST create', () => {
    it('should return the permission object created', async () => {
      permissionService.create = jest.fn().mockResolvedValue(mockPermissionDTO);
      const result = await permissionController.create(mockPermissionDTO);
      expect(result).toMatchObject({
        name: 'name',
        description: 'description mock',
      });
    });
  });
});
