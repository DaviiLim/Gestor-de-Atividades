import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateRequerenteDto {

    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    setorId: number;

}
