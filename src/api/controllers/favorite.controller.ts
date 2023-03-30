import { favoriteService } from "../services/favorite/favorite.service";
import { Request, Response, NextFunction } from "express";

export const favoriteController = {
  async addMovieToFavorite(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { userId, movieId } = req.params;

    const favorite = await favoriteService.addMovieToFavorite(userId, movieId);

    if (!favorite.data) next(favorite);

    return res.status(favorite.status).json(favorite.data);
  },

  async findFavoriteByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const userId = req.params.id;

    const favorite = await favoriteService.findAllByUser(userId);

    if (!favorite.data) next(favorite);

    return res.status(favorite.status).json(favorite.data);
  },
};
