import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserCredentialsDTO } from 'src/dtos/user-credentials.dto';
import { AuthToken } from 'src/auth/interfaces/auth-token.interface';
import { User } from 'src/repository/entities/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('test')
  @UseGuards(JwtAuthGuard)
  async validateUser(@Body() userCredentialDTO: UserCredentialsDTO): Promise<string> {
    const { username, password } = userCredentialDTO;
    return this.authService.validateUser(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Request() req): Promise<AuthToken> {
    const user = req.user as User;
    return await this.authService.logIn(user);
  }
}
