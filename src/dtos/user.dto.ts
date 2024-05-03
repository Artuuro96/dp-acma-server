import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { RolesAssignedDTO } from './roles-assigned.dto';
import { ModulesAssignedDTO } from './modules-assigned.dto';

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
  roles: RolesAssignedDTO[];

  @IsArray()
  modules: ModulesAssignedDTO[];

  @IsBoolean()
  active: boolean;
}
