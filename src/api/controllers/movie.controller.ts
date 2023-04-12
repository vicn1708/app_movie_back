import { NextFunction, Request, Response } from "express";
import { MovieService } from "../services/movies/movie.service";

class MovieController {
  private readonly movieService: MovieService;

  constructor(movieService: MovieService) {
    this.movieService = movieService;
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const dataMovie = req.body.data;
    const filesMovie = req.files;

    const movie = await this.movieService.create(dataMovie, filesMovie);

    if (!movie.data) return next(movie);

    return res.status(movie.status).json(movie.data);
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const movies = await this.movieService.findAll();

    if (!movies.data) return next(movies);

    return res.status(movies.status).json(movies.data);
  }

  async findAllLimit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const limit = Number(req.params.limit);

    const movies = await this.movieService.findAllLimit(limit);

    if (!movies.data) return next(movies);

    return res.status(movies.status).json(movies.data);
  }

  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const movieId = req.params.movieId.toString();

    const movie = await this.movieService.findOne(movieId);

    if (!movie.data) return next(movie);
    return res.status(movie.status).json(movie.data);
  }

  async deleteOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const movieId = req.params.movieId.toString();

    const deleteMovie = await this.movieService.deleteOne(movieId);

    if (!deleteMovie.data) return next(deleteMovie);

    return res.status(deleteMovie.status).json(deleteMovie.data);
  }

  async getAllMovieByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const getAllMovieByCate = await this.movieService.getAllMovieByCategory();

    console.log("sidjfodsfi");

    if (!getAllMovieByCate.data) return next(getAllMovieByCate);

    return res.status(getAllMovieByCate.status).json(getAllMovieByCate.data);
  }

  async updateOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const movieId: string = req.params.movieId;
    const movieFiles =
      Object.keys(JSON.parse(JSON.stringify(req.files))).length > 0
        ? req.files
        : undefined;
    const dataMovie: string = req.body.data;

    console.log(movieId);
    console.log(movieFiles);
    console.log(dataMovie);

    const movieUpdated = await this.movieService.updateOne(
      dataMovie,
      movieFiles,
      movieId
    );

    if (!movieUpdated.data) return next(movieUpdated);

    return res.status(movieUpdated.status).json(movieUpdated.data);
  }

  async getMoviesTopLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const limit: number = Number(req.params.limit);

    const getMoviesTopLikes = await this.movieService.getMoviesTopLikes(limit);

    if (!getMoviesTopLikes.data) return next(getMoviesTopLikes);

    return res.status(getMoviesTopLikes.status).json(getMoviesTopLikes.data);
  }

  async getMoviesTopViews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const limit: number = Number(req.params.limit);

    const getMoviesTopViews = await this.movieService.getMoviesTopViews(limit);

    if (!getMoviesTopViews.data) return next(getMoviesTopViews);

    return res.status(getMoviesTopViews.status).json(getMoviesTopViews.data);
  }
}

export const movieController = new MovieController(new MovieService());
