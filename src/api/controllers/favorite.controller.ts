import { FavoriteService } from "../services/favorite/favorite.service";
import { Request, Response, NextFunction } from "express";

class FavoriteController {
  private readonly favoriteService: FavoriteService;

  constructor(favoriteService: FavoriteService) {
    this.favoriteService = favoriteService;
  }

  async findFavoriteByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const userId = req.params.id;

    const favorite = await this.favoriteService.findAllByUser(userId);

    if (!favorite.data) return next(favorite);

    return res.status(favorite.status).json(favorite.data);
  }

  async addMovieToFavorite(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { userId, movieId } = req.params;

    const favorite = await this.favoriteService.addMovieToFavorite(
      userId,
      movieId
    );

    if (!favorite.data) return next(favorite);

    return res.status(favorite.status).json(favorite.data);
  }

  async removeMovieFromFavorite(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { userId, movieId } = req.params;

    const favorite = await this.favoriteService.removeMovieFromFavorite(
      userId,
      movieId
    );

    if (!favorite.data) return next(favorite);

    return res.status(favorite.status).json(favorite.data);
  }
}

export const favoriteController = new FavoriteController(new FavoriteService());
