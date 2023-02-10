import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/repository/entities/user.entity';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import { UserService } from 'src/user/services/user.service';
import { EntityManager } from 'typeorm';
import { AuthService } from './auth.service';
import { compare } from 'bcrypt';
jest.mock('bcrypt');

const mockedCompare = compare as jest.Mock;

describe('AuthService', () => {
  let userService: UserService;
  let jwtService: JwtService;
  let config: ConfigService;
  let authService: AuthService;
  let user: User;

  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        UserService,
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
    userService = moduleRef.get<UserService>(UserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    config = moduleRef.get<ConfigService>(ConfigService);
  });

  beforeEach(async () => {
    user = new User({
      id: 'id',
      name: 'name',
      lastName: 'lastName',
      password: 'password',
      secondLastName: 'secondLastName',
    });
    userService.findOne = jest.fn().mockResolvedValue(user);
    jwtService.sign = jest.fn().mockReturnValue('token');
    config.get = jest.fn().mockReturnValue('3600s');
    mockedCompare.mockImplementation(() => true);
  });

  describe('validate', () => {
    it('should validate and return the user', async () => {
      const result = await authService.validateUser('name', 'password');
      expect(mockedCompare).toHaveBeenCalledWith('password', 'password');
      expect(userService.findOne).toHaveBeenCalledWith('name');
      expect(result).toStrictEqual(user);
    });

    it('should throw NotFoundException when the username is not found', async () => {
      userService.findOne = jest.fn().mockResolvedValue(undefined);
      await expect(authService.validateUser('name', 'password')).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException when the password is incorrect', async () => {
      mockedCompare.mockImplementation(() => false);
      await expect(authService.validateUser('name', 'pass')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logIn', () => {
    it('should return the token and the expiration properly', async () => {
      const result = await authService.logIn({
        name: 'name',
        lastName: 'lastName',
      });
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result).toStrictEqual({
        access_token: 'token',
        expires: '3600s',
      });
    });
  });
});
