import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { OneToMany } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

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

    @IsNumber()
    @IsNotEmpty()
    roleId: number;

}
