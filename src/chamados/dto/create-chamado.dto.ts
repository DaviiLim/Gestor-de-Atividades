import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum StatusChamado {

    ABERTO = 'ABERTO',
    CONCLUIDO = 'CONCLUIDO',

}

export class CreateChamadoDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;  

    @IsOptional()
    @IsEnum(StatusChamado)
    status: StatusChamado;

    @IsNotEmpty()
    @IsNumber() 
    usuarioId: number;

}
