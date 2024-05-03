import { IsNotEmpty, IsString } from 'class-validator';

export class ModulesAssignedDTO {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
