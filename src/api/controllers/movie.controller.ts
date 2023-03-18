import { movieService } from "../services/movies/movie.service";

export const movieController = {
  create: movieService.create,
  findAll: movieService.findAll,
  findOne: movieService.findOne,
  deleteOne: movieService.deleteOne,
};
