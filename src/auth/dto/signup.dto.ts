import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignupDto {

    @ApiProperty({
        example: "Marco Castro",
        description: "Nome completo do usuário"
    })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({
        example: "usuario@email.com",
        description: "Email que receberá as atualizção sobre o usuário."
    }) 
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
      example: "S&nha123",
      description:
        "Senha entre 6 e 8 caracteres, contendo letra maiúscula, minúscula e número ou caractere especial."
    })   
    @IsString()
    @MinLength(6)
    @MaxLength(8)
    @IsNotEmpty()
    @Matches(/^\S+$/, 
        {
    message: 'Password cannot contain spaces',
    }
)
    @Matches(
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  {
    message:
      "Password needs to have: " +
      " At least 1 upper case letter ;" +
      " At least 1 lower case letter ;" +
      " At least 1 number or special character "
  }
)

    password: string;

    @ApiProperty({
        example: 1,
        description: "ID do papel (role) do usuário."
    })
    @IsNumber()
    @IsNotEmpty()
    roleId: number;

}
