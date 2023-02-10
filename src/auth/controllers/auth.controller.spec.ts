import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { PermissionService } from 'src/permission/services/permission.service';
import { User } from 'src/repository/entities/user.entity';
import { PermissionRepository } from 'src/repository/repositories/permission/permission.repository';
import { RoleRepository } from 'src/repository/repositories/role/role.repository';
import { UserRepository } from 'src/repository/repositories/user/user.repository';
import { RoleService } from 'src/role/services/role.service';
import { UserService } from 'src/user/services/user.service';
import { EntityManager } from 'typeorm';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;
  let jwtService: JwtService;

  const entityManagerMock = () => ({
    queryBuilderMock,
  });
  let queryBuilderMock;

  const request = {
    user: {
      name: 'name',
      password: 'password',
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        UserService,
        UserRepository,
        RoleService,
        RoleRepository,
        PermissionService,
        PermissionRepository,
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
    jwtService = moduleRef.get<JwtService>(JwtService);
    authController = moduleRef.get<AuthController>(AuthController);

    authService.logIn = jest.fn().mockResolvedValue({
      access_token: 'token',
      expires: '3600s',
    });
    jwtService.sign = jest.fn().mockReturnValue('token');
  });

  describe('login', () => {
    it('should log the user in and return the access_token', async () => {
      const result = await authController.logIn(request);
      expect(authService.logIn).toHaveBeenCalledWith({
        name: 'name',
        password: 'password',
      });
      expect(result).toStrictEqual({
        access_token: 'token',
        expires: '3600s',
      });
    });
  });
});
