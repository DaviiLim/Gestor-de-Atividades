import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRequerenteDto {

    @ApiProperty({
        example: "Marco Castro",
        description: "Nome completo do usuário"
    })
    @IsNotEmpty( {message: 'fullName cannot be empty!'} )
    @IsString()
    fullName: string;
    
    @ApiProperty({
        example: 2,
        description: "ID do Setor"
    })
    @IsNotEmpty({ message: 'setorId cannot be empty!' })
    @Type(() => Number)
    @IsNumber()
    setorId: number;

}
