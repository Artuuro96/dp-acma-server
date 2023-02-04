import { IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
