import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('AuthHealthController', () => {
  let healthController: HealthController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HealthController],
    }).compile();

    healthController = moduleRef.get<HealthController>(HealthController);
  });

  it('should check the health of authController', () => {
    const result = healthController.checkHealth();
    expect(result).toBeTruthy();
  });
});
