import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty( {message: 'fullName cannot be empty!'} )
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @Matches(/^\S*$/, { message: 'password cannot have spaces' })
    password: string;

    @IsNumber()
    @IsNotEmpty()
    roleId: number;

}
