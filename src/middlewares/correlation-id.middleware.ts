import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const CORRELATION_ID = 'correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = uuidv4();
    req[CORRELATION_ID] = id;
    res.set(CORRELATION_ID, id);
    next();
  }
}
