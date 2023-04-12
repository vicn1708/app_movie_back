import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class LoginAuth {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
