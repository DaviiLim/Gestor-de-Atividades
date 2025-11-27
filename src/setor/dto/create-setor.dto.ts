import { IsNotEmpty, IsString } from "class-validator";

export class CreateSetorDto {

    @IsString()
    @IsNotEmpty()
    name: string;

}
