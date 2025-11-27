import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

export enum roleUsuario {
    REQUERENTE = 'requerente',
    TECNICO = 'técnico',
    ADMIN = 'admin',
}

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsEnum(roleUsuario)
    @IsNotEmpty()
    role: roleUsuario;

}
