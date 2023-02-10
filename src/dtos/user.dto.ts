import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  secondLastName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsArray()
  roles: string[];

  @IsBoolean()
  active: boolean;
}
