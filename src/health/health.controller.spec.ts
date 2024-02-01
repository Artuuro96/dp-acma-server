import { Test } from '@nestjs/testing';
import { HealthCheckController } from './health.controller';

describe('AuthHealthController', () => {
  let healthController: HealthCheckController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HealthCheckController],
    }).compile();

    healthController = moduleRef.get<HealthCheckController>(HealthCheckController);
  });

  it('should check the health of authController', () => {
    const result = healthController.checkHealth();
    expect(result).toBeTruthy();
  });
});
