import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  permissions: string[];
}
