import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum StatusChamado {

    ABERTO = 'ABERTO',
    CONCLUIDO = 'CONCLUÍDO',

}

export class CreateChamadoDto {

    @ApiProperty({
        example: 'Título',
        description: "Título do chamado."
    })
    @IsString()
    @IsNotEmpty( {message: 'Title cannot be empty!'} )
    title: string;

    @ApiProperty({
        example: 'Descrição',
        required: false,
        description: "Descrição do chamado."
    })
    @IsString()
    @IsOptional()
    description: string;  

    @ApiProperty({
        example: 'PENDENTE',
        description: "Status do chamado."
    })
    @IsOptional()
    @IsEnum(StatusChamado)
    status: StatusChamado;

    @ApiProperty({
        example: 1,
        description: "Requerente do chamado."
    })
    @IsNotEmpty({ message: 'requerenteId cannot be empty!' })
    @Type(() => Number)
    @IsNumber()
    requerenteId: number;

    @ApiProperty({
        example: 2,
        description: "ID do Setor"
    })
    @IsNotEmpty({ message: 'setorId cannot be empty!' })
    @Type(() => Number)
    @IsNumber()
    setorId: number;

    @ApiProperty({
        example: '2025-12-10T10:00:00.000Z',
        required: false,
        description: "Data de início do chamado (ISO 8601)."
    })
    @IsOptional()
    @IsDateString({}, { message: 'startDate must be a valid ISO date string' })
    startDate?: string;

    @ApiProperty({
        example: '2025-12-11T18:00:00.000Z',
        required: false,
        description: "Data de término do chamado (ISO 8601)."
    })
    @IsOptional()
    @IsDateString({}, { message: 'endDate must be a valid ISO date string' })
    endDate?: string;

}
