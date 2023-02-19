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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
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
      roles: user.roles,
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

  async refresh(executionCtx: Context, refreshToken: string): Promise<any> {
    const user = await this.userService.findOneById(executionCtx.userId);

    if (isNil(user) || isNil(user.refreshToken)) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenMatching = compare(refreshToken, user.refreshToken);

    if (isRefreshTokenMatching) {
      throw new UnauthorizedException();
    }

    const token = await this.generateTokens(executionCtx);

    const updatedUser = await this.userService.updateById(new Context(user), user.id, {
      refreshToken: token.refreshHashed,
    });

    if (isNil(updatedUser)) {
      throw new InternalServerErrorException('Error trying to update refresh token');
    }
    return token;
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
