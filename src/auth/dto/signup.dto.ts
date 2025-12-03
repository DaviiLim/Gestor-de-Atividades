import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class SignupDto {

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
