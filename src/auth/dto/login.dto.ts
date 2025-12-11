import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({
        example: "usuario@email.com",
        description: "Email que receberá as atualizção sobre o usuário."
    })
    @IsNotEmpty({ message: 'Email cannot be empty!' })
    @IsEmail({}, { message: 'Invalid email format!' })
    email: string;

    @ApiProperty({
        example: "S&nha123",
        description: "Senha do usuário."
    })
    @IsNotEmpty( {message: 'Password cannot be empty!'} )
    @IsString()
    password: string;

}