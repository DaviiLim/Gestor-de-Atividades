import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;

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
  newPassword: string;
}