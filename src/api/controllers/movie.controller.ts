import { NextFunction, Request, Response } from "express";
import { movieService } from "../services/movies/movie.service";

export const movieController = {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const dataMovie = req.body.data;
    const filesMovie = req.files;

    const movie = await movieService.create(dataMovie, filesMovie);

    if (!movie.data) next(movie);

    return res.status(movie.status).send(movie.data);
  },

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const movies = await movieService.findAll();

    if (!movies.data) next(movies);

    return res.status(movies.status).send(movies.data);
  },

  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const movieId = req.params.id.toString();

    const movie = await movieService.findOne(movieId);

    if (!movie.data) next(movie);
    return res.status(movie.status).send(movie.data);
  },

  async deleteOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const movieId = req.params.id.toString();

    const deleteMovie = await movieService.deleteOne(movieId);

    if (!deleteMovie.data) next(deleteMovie);

    return res.status(deleteMovie.status).send(deleteMovie.data);
  },

  async getAllMovieByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const getAllMovieByCate = await movieService.getAllMovieByCategory();

    if (!getAllMovieByCate.data) next(getAllMovieByCate);

    return res.status(getAllMovieByCate.status).send(getAllMovieByCate.data);
  },
};
