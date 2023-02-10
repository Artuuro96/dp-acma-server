import { BaseEntity } from './base.entity';

describe('BaseEntity', () => {
  describe('Entity', () => {
    it('should create base entity', () => {
      const baseEntity = new BaseEntity({
        id: 'id-1',
        createdAt: new Date(),
        createdBy: 'id',
        updatedAt: new Date(),
        updatedBy: 'id',
        deleted: true,
        deletedAt: new Date(),
        deletedBy: 'id',
      });

      expect(baseEntity).toBeDefined();
    });

    it('should be undefined when there is no data', () => {
      const baseEntity = new BaseEntity();
      expect(baseEntity.createdAt).toBe(undefined);
      expect(baseEntity.id).toBe(undefined);
      expect(baseEntity.updatedAt).toBe(undefined);
      expect(baseEntity.updatedBy).toBe(undefined);
      expect(baseEntity.createdBy).toBe(undefined);
      expect(baseEntity.deleted).toBe(undefined);
      expect(baseEntity.deletedAt).toBe(undefined);
      expect(baseEntity.deletedBy).toBe(undefined);
    });
  });
});
