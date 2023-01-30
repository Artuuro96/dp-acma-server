import { IsString } from 'class-validator';

export class PermissionDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
