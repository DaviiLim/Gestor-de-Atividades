import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export enum RoleUsuarios{
  TECNICO = 'TÉCNICO',

}

export class CreateRoleDto {

    @ApiProperty({
      example:'Técnico',
      description:'Nome da Role'
    })
    @IsNotEmpty( {message: 'Name cannot be empty!'} )
    @IsString()
    name: string;

}
