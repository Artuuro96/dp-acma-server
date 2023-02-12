import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;
  const ctxMock = createMock<ExecutionContext>();

  beforeAll(async () => {
    //const mockExecutionContext = new ExecutionContext();
    const moduleRef = await Test.createTestingModule({
      providers: [JwtAuthGuard, Reflector],
    }).compile();

    jwtAuthGuard = moduleRef.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  describe('canActivate', () => {
    it('shoud get call reflector.get method to check if it is public', async () => {
      reflector.get = jest.fn().mockReturnValue(true);
      const result = await jwtAuthGuard.canActivate(ctxMock);
      expect(reflector.get).toHaveBeenCalledWith(IS_PUBLIC_KEY, ctxMock.getHandler());
      expect(result).toBeTruthy();
    });
  });
});
