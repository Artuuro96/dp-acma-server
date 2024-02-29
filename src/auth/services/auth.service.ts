import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/repository/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { AuthToken } from '../interfaces/auth-token.interface';
import { compare, hash, genSaltSync } from 'bcrypt';
import { Context } from '../context/execution-ctx';
import { isNil } from 'lodash';
import { Token } from '../interfaces/token.interface';
import { Role } from 'src/repository/entities/role.entity';
import { Module } from 'src/repository/entities/module.entity';
import { PermissionService } from 'src/permission/services/permission.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly permissionService: PermissionService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('username is not found, try again');
    }
    const isPasswordMathing = await compare(password, user.password);
    if (!isPasswordMathing) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async logIn(user: Partial<User>): Promise<AuthToken> {
    const payload = {
      userId: user.id,
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      secondLastName: user.secondLastName,
      email: user.email,
      roles: user.roles?.map((role) => new Role({ id: role.id, name: role.name })),
      modules: user.modules?.map(
        (module) =>
          new Module({
            path: module.path,
            name: module.name,
            icon: module.icon,
          }),
      ),
    };

    const token = await this.generateTokens(payload);
    const updatedUser = await this.userService.updateById(new Context(user), user.id, {
      refreshToken: token.refreshHashed,
    });

    if (!updatedUser) {
      throw new InternalServerErrorException('Error trying to update refresh token');
    }

    return {
      accessToken: token.access,
      refreshToken: token.refresh,
      expiresIn: this.config.get('EXPIRES_IN'),
    };
  }

  async logInAs(executionCtx: Context): Promise<AuthToken> {
    const permissions = await this.permissionService.findByRoleId(executionCtx.activeRole.id);

    const payload = {
      userId: executionCtx.userId,
      username: executionCtx.username,
      name: executionCtx.name,
      lastName: executionCtx.lastName,
      secondLastName: executionCtx.secondLastName,
      email: executionCtx.email,
      activeRole: executionCtx.activeRole,
      modules: executionCtx.modules,
      permissions: permissions.map((permission) => permission.name),
    };

    const token = await this.generateTokens(payload);
    const updatedUser = await this.userService.updateById(executionCtx, executionCtx.userId, {
      refreshToken: token.refreshHashed,
    });

    if (!updatedUser) {
      throw new InternalServerErrorException('Error trying to update refresh token');
    }

    return {
      accessToken: token.access,
      refreshToken: token.refresh,
      expiresIn: this.config.get('EXPIRES_IN'),
    };
  }

  async refresh(executionCtx: Context, refreshToken: string): Promise<any> {
    const user = await this.userService.findOneById(executionCtx.userId);

    if (isNil(user) || isNil(user.refreshToken)) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenMatching = await compare(encodeURI(refreshToken), user.refreshToken);

    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: executionCtx.userId,
      username: executionCtx.username,
      name: executionCtx.name,
      lastName: executionCtx.lastName,
      secondLastName: executionCtx.secondLastName,
      email: executionCtx.email,
      activeRole: executionCtx?.activeRole,
      modules: executionCtx.modules,
    };

    const token = await this.generateTokens(payload);

    const updatedUser = await this.userService.updateById(new Context(user), user.id, {
      refreshToken: token.refreshHashed,
    });

    if (isNil(updatedUser)) {
      throw new InternalServerErrorException('Error trying to update refresh token');
    }

    return {
      accessToken: token.access,
      refreshToken: token.refresh,
      expiresIn: this.config.get('EXPIRES_IN'),
    };
  }

  async verify(token: string): Promise<any> {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async verifyPermissions(roleId: string, resource: string): Promise<boolean> {
    const userPermissions = await this.permissionService.findByRoleId(roleId);
    const permissions = userPermissions.map((permission) => permission.name);
    return permissions.includes(resource);
  }

  private async generateTokens(payload: any): Promise<Token> {
    const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('REFRESH_EXPIRES_IN') });
    const salt = genSaltSync(Number(this.config.get('SALT')));
    const refreshTokenHashed = await hash(refreshToken, salt);
    const accessToken = this.jwtService.sign(payload);

    return {
      refresh: refreshToken,
      refreshHashed: refreshTokenHashed,
      access: accessToken,
    };
  }
}
