import { CorrelationIdMiddleware } from './correlation-id.middleware';
import { Request, Response } from 'express';
import { createMock } from '@golevelup/ts-jest';

describe('CorrelationIdMiddleware', () => {
  const requestMock = createMock<Request>();
  const responseMock = createMock<Response>();
  const nextFunc = jest.fn();

  describe('use', () => {
    it('shoud call use function of middleware', async () => {
      const correlationIdMiddleware = new CorrelationIdMiddleware();
      correlationIdMiddleware.use(requestMock, responseMock, nextFunc);
      expect(correlationIdMiddleware).toBeDefined();
    });

    it('CorrelationIdMiddleware constructor', async () => {
      const correlationIdMiddleware = new CorrelationIdMiddleware();
      expect(correlationIdMiddleware).toBeDefined();
    });
  });
});
