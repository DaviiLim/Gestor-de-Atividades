import { IsNotEmpty, IsString } from "class-validator";

export enum RoleUsuarios{

  TECNICO = 'TECNICO',
  TECNICO_ACENTUADO = 'TÉCNICO'

}

export class CreateRoleDto {

    @IsString()
    @IsNotEmpty()
    name: string;

}
