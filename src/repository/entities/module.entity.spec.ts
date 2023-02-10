import { Module } from './module.entity';

describe('ModuleEntity', () => {
  describe('Entity', () => {
    it('should create base entity', () => {
      const baseEntity = new Module({
        id: 'id-1',
        name: 'name',
        description: 'descripton',
        deleted: false,
      });

      expect(baseEntity).toBeDefined();
    });

    it('should be undefined when there is no data', () => {
      const module = new Module();
      expect(module.description).toBe(undefined);
      expect(module.id).toBe(undefined);
      expect(module.name).toBe(undefined);
      expect(module.deleted).toBe(undefined);
    });
  });
});
