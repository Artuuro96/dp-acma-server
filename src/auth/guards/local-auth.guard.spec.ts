import { LocalAuthGuard } from './local-auth.guard';

describe('JwtAuthGuard', () => {
  it('shoud get call reflector.get method to check if it is public', async () => {
    const localAuthGuard = new LocalAuthGuard();
    expect(localAuthGuard).toBeDefined();
  });
});
