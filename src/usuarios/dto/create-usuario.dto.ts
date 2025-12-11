import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {

  @ApiProperty({
    example: "Marco Castro",
    description: "Nome completo do usuário."
  })
  @IsNotEmpty({ message: "fullName cannot be empty!" })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: "usuario@email.com",
    description: "Email válido do usuário."
  })
  @IsNotEmpty({ message: "Email cannot be empty!" })
  @IsEmail({}, { message: "Invalid email!" })
  email: string;

  @ApiProperty({
    example: "S&nha123",
    description:
      "Senha entre 6 e 8 caracteres, contendo letra maiúscula, minúscula e número ou caractere especial."
  })
  @IsNotEmpty({ message: "Password cannot be empty!" })
  @IsString()
  @MinLength(6, { message: "Password must have at least 6 characters" })
  @MaxLength(8, { message: "Password must have at most 8 characters" })
  @Matches(/^\S+$/, {
    message: "Password cannot contain spaces"
  })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message:
        "Password needs to have: At least 1 upper case letter; At least 1 lower case letter; At least 1 number or special character."
    }
  )
  password: string;

  @ApiProperty({
    example: 1,
    description: "ID do papel (role) associado ao usuário."
  })
  @IsNotEmpty({ message: "roleId cannot be empty!" })
  @Type(() => Number)
  @IsNumber({}, { message: "roleId must be a number!" })
  roleId: number;

}
