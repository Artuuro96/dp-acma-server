import { IsNotEmpty, IsString } from 'class-validator';

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

  email: string;

  password: string;

  roleId: string;

  settingId: string;

  active: boolean;

  oldPasswords: string[];

  recoveryCode: string;
}
