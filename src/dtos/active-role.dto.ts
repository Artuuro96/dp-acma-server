import { IsNotEmpty, IsString } from 'class-validator';

export class ActiveRoleDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
