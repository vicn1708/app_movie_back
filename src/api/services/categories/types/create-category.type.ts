import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategory {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  status?: string;
}
