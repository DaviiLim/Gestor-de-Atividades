import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPassword {
    
    @ApiProperty( {example: 'usuario@IsEmail.com'} )
    @IsEmail()
    @IsNotEmpty()
    email: string

}