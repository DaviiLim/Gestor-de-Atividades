import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignupDto {

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

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

    @IsNumber()
    @IsNotEmpty()
    roleId: number;

}
