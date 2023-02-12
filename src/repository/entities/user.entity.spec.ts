import { User } from './user.entity';

describe('UserEntity', () => {
  describe('Entity', () => {
    it('should create base entity', () => {
      const userEntity = new User({
        id: 'id-1',
        name: 'name',
        deleted: false,
      });

      expect(userEntity).toBeDefined();
      expect(userEntity).toBeDefined();
    });

    it('should be undefined when there is no data', () => {
      const user = new User();
      expect(user.id).toBe(undefined);
      expect(user.name).toBe(undefined);
      expect(user.deleted).toBe(undefined);
    });
  });
});
