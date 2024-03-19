import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    this.logger.error(`[${request['correlation-id']}] ${exception.stack}`);

    response.status(500).json({
      statusCode: 500,
      message: exception?.message,
      error: exception?.stack,
    });
  }
}
