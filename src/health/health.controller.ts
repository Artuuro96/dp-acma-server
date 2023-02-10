import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';

@Controller('health')
export class HealthController {
  @Public()
  @Get()
  checkHealth(): { healthy: boolean } {
    return {
      healthy: true,
    };
  }
}
