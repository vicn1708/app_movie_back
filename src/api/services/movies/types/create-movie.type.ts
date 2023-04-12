import { IsObject, IsNotEmpty } from "class-validator";

export class CreateMovie {
  @IsNotEmpty()
  @IsObject()
  data: {
    title: string;
    categories: string[];
    casts: string[];
    characters: string[];
    genres: string[];
    description: string;
  };

  @IsNotEmpty()
  trailer: File;

  @IsNotEmpty()
  poster: File;

  @IsNotEmpty()
  banner: File;
}
