import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum StatusChamado {

    ABERTO = 'ABERTO',
    CONCLUIDO = 'CONCLUÍDO',

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
    requerenteId: number;

    @IsNotEmpty()
    @IsNumber() 
    setorId: number;

    @IsString()
    @IsOptional()
    startDate?: string;

    @IsString()
    @IsOptional()
    endDate?: string;

}
