import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error(`[${request['correlation-id']}] ${exception.stack}`);

    const exceptionResponse = exception.getResponse() as any;

    response.status(status).json({
      statusCode: status,
      message: exceptionResponse?.message || exception.message,
      error: exception.stack,
    });
  }
}
