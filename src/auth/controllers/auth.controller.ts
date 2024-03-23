import { Controller, Post, Request, UseGuards, Headers, UnauthorizedException, Body } from '@nestjs/common';
import { AuthToken } from 'src/auth/interfaces/auth-token.interface';
import { User } from 'src/repository/entities/user.entity';
import { Context } from '../context/execution-ctx';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RefreshJwtGuard } from '../guards/refresh-jwt.guard';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ActiveRoleDTO } from 'src/dtos/active-role.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Request() req): Promise<AuthToken> {
    const user = req.user as User;
    return await this.authService.logIn(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('loginAs')
  async logInAs(@Request() req, @Body('activeRole') activeRole: ActiveRoleDTO): Promise<AuthToken> {
    const user = req.user as User;
    user.activeRole = activeRole;
    return await this.authService.logInAs(new Context(user));
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() req): Promise<any> {
    const user = req.user as User;
    return await this.authService.refresh(new Context(user), user.refreshToken);
  }

  @Post('verify')
  async verify(@Headers('Authorization') bearerToken: string): Promise<{ verified: boolean }> {
    if (!bearerToken) {
      throw new UnauthorizedException('token not found');
    }
    const token = bearerToken.replace('Bearer', '').trim();
    await this.authService.verify(token);
    return {
      verified: true,
    };
  }
}
