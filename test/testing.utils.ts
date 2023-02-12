import { Context } from 'src/auth/context/execution-ctx';

export function createMockExcutionCtx(): Context {
  return new Context({
    userId: 'userId',
    username: 'username',
    name: 'name',
    lastName: 'lastName',
    secondLastName: 'secondLastName',
    email: 'email@test.com',
    roles: ['role-1', 'role-2'],
    modules: ['module-1'],
    iat: 19191919,
    exp: 19191919,
  });
}
