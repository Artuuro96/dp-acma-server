import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/repository/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException('Invalid username, try again');
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async logIn(user: Partial<User>) {
    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      secondLastName: user.secondLastName,
      email: user.email,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      expires: 3600,
    };
  }
}
