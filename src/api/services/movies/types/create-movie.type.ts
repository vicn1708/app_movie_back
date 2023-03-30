export type CreateMovie = {
  data: {
    title: string;
    categories: string[];
    casts: string[];
    characters: string[];
    genres: string[];
    description: string;
  };
  trailer: File;
  poster: File;
  banner: File;
};
