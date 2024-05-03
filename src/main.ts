import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UserService } from './user/services/user.service';
import { Context } from './auth/context/execution-ctx';
import { UserDTO } from './dtos/user.dto';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const config = new ConfigService();
    app.enableCors();
    app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter());
    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new ValidationPipe());
    await createSuperUser(app, config);
    await app.listen(config.get('PORT'));
  } catch (error) {
    console.error(error);
  }
}
bootstrap();

async function createSuperUser(app: INestApplication, config: ConfigService) {
  try {
    const userService = app.get(UserService);
    await userService.create(
      {
        userId: 'd307525c-54a2-47b8-8338-c9238549590a',
      } as Context,
      {
        email: config.get('EMAIL'),
        name: 'system',
        lastName: 'acma',
        secondLastName: 'user',
        username: config.get('USERNAME'),
        password: config.get('PASSWORD'),
        active: true,
        roles: [],
        modules: [],
      } as UserDTO,
    );
    return true;
  } catch (error) {
    return error.code === '23505' || error;
  }
}
