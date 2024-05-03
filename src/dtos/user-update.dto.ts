import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { ActiveRole } from 'src/auth/interfaces/active-role';
import { ModulesAssignedDTO } from './modules-assigned.dto';
import { RolesAssignedDTO } from './roles-assigned.dto';

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

  @IsString()
  @IsOptional()
  activeRole?: ActiveRole;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  modules?: ModulesAssignedDTO[];

  @IsArray()
  @IsOptional()
  @ValidateNested()
  roles?: RolesAssignedDTO[];
}
