import { Permission } from './permission.entity';
import { Role } from './role.entity';

describe('ModuleEntity', () => {
  describe('Entity', () => {
    it('should create base entity', () => {
      const roleEntity = new Role({
        id: 'id-1',
        name: 'name',
        description: 'descripton',
        deleted: false,
        permissions: [
          new Permission({
            id: 'id',
            name: 'name',
            description: 'description',
            deleted: false,
          }),
        ],
      });

      expect(roleEntity).toBeDefined();
      expect(roleEntity.permissions).toBeDefined();
    });

    it('should be undefined when there is no data', () => {
      const role = new Role();
      expect(role.description).toBe(undefined);
      expect(role.id).toBe(undefined);
      expect(role.name).toBe(undefined);
      expect(role.deleted).toBe(undefined);
    });
  });
});
