import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/repository/entities/user.entity';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import { UserService } from 'src/user/services/user.service';
import { EntityManager } from 'typeorm';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtStrategy,
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

    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
  });

  it('should create LocalStrategy instance', async () => {
    const result = await jwtStrategy.validate({
      id: 'id',
      username: 'username',
    });
    expect(result).toStrictEqual({
      id: 'id',
      username: 'username',
    });
  });
});
