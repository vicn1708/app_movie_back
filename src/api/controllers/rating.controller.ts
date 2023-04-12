import { Request, Response, NextFunction } from "express";
import { RatingService } from "../services/rating/rating.service";

class RatingController {
  private readonly ratingService: RatingService;

  constructor(ratingService: RatingService) {
    this.ratingService = ratingService;
  }

  async updateViews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const movieId = req.params.movieId;

    const ratingViews = await this.ratingService.updateViews(movieId);

    if (!ratingViews.data) return next(ratingViews);

    return res.status(ratingViews.status).json(ratingViews.data);
  }

  async updateLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const movieId = req.params.movieId;

    const ratingLikes = await this.ratingService.updateLikes(movieId);

    if (!ratingLikes.data) return next(ratingLikes);

    return res.status(ratingLikes.status).json(ratingLikes.data);
  }
}

export const ratingController = new RatingController(new RatingService());
