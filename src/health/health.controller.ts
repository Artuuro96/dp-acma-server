import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('/health')
export class HealthCheckController {
  @Public()
  @Get()
  async checkHealth(): Promise<{ status: string; version: string }> {
    return {
      status: 'up',
      version: '1.0.0',
    };
  }
}
