import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/repository/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { AuthToken } from '../interfaces/auth-token.interface';
import * as bcrypt from 'bcrypt';

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
    const isPasswordMathing = await bcrypt.compare(password, user.password);
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

    return {
      access_token: this.jwtService.sign(payload),
      expires: this.config.get('EXPIRES_IN'),
    };
  }
}
