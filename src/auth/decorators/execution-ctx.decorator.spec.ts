import { createMock } from '@golevelup/ts-jest';
import { Request } from 'express';
import { Context } from '../context/execution-ctx';
import { extractContext } from './execution-ctx.decorator';
describe('Execution', () => {
  describe('extract context', () => {
    it('should return the extract context of a request', () => {
      const request = createMock<Request>();
      request.user = {
        userId: 'id',
        name: 'name',
      };
      const result = extractContext(request);
      expect(result).toBeDefined();
    });

    it('should ', () => {
      const result = extractContext({});
      expect(result).toBeInstanceOf(Context);
    });
  });
});
