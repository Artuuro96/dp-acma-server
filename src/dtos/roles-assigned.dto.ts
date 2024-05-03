import { IsNotEmpty, IsString } from 'class-validator';

export class RolesAssignedDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
