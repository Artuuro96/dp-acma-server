import { IsNotEmpty, IsString } from 'class-validator';

export class ModuleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  componentName: string;

  description: string;

  @IsString()
  icon: string;
}
