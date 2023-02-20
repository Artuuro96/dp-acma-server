import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  secondLastName: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsStrongPassword()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
