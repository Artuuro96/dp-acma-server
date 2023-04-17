import { Module } from '@nestjs/common';
import { HealthCheckController } from './health.controller';

@Module({
  controllers: [HealthCheckController],
  exports: [HealthModule],
})
export class HealthModule {}
