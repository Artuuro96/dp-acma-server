import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/repository/entities/user.entity';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import { UserService } from 'src/user/services/user.service';
import { EntityManager } from 'typeorm';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let authService: AuthService;
  let localStrategy: LocalStrategy;
  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        AuthService,
        JwtService,
        UserService,
        ConfigService,
        UserRepository,
        {
          provide: EntityManager,
          useFactory: entityManagerMock,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(jest.fn())
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
    localStrategy = moduleRef.get<LocalStrategy>(LocalStrategy);
  });

  it('should create LocalStrategy instance', async () => {
    authService.validateUser = jest.fn();
    await localStrategy.validate('username', 'password');
    expect(authService.validateUser).toHaveBeenCalledWith('username', 'password');
  });
});
