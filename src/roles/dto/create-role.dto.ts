import { IsNotEmpty, IsString } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";

export class CreateRoleDto {

    @IsString()
    @IsNotEmpty()
    name: string;

}
