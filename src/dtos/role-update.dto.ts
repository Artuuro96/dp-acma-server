import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoleUpdateDTO {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
