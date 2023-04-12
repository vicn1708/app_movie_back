import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class CreateAccount {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
