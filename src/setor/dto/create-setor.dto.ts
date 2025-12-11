import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSetorDto {

    @ApiProperty({
        example:'DTIN',
        description:'Nome do Setor'
    })
    @IsNotEmpty( {message: 'Name cannot be empty!'} )
    @IsString()
    name: string;

}
