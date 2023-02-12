import { Session } from './session.entity';

describe('SessionEntity', () => {
  describe('Entity', () => {
    it('should create base entity', () => {
      const sessionEntity = new Session({
        id: 'id-1',
        createdAt: new Date(),
        deleted: false,
      });

      expect(sessionEntity).toBeDefined();
      expect(sessionEntity).toBeDefined();
    });

    it('should be undefined when there is no data', () => {
      const session = new Session();
      expect(session.id).toBe(undefined);
      expect(session.createdAt).toBe(undefined);
      expect(session.deleted).toBe(undefined);
    });
  });
});
