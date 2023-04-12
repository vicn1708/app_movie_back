import RatingModel from "../../schema/ratings.schema";
import MovieModel from "../../schema/movies.schema";
import createError from "http-errors";

export class RatingService {
  async updateViews(movieId: string) {
    try {
      const ratingMovie = await MovieModel.findById(movieId).select("rating");

      if (!ratingMovie) throw createError.BadRequest(`Movie is not exist`);

      const rating = await RatingModel.findByIdAndUpdate(
        ratingMovie.rating,
        {
          $inc: { views: 1 },
        },
        { new: true }
      ).exec();

      return { status: 200, data: rating };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async updateLikes(movieId: string) {
    try {
      const ratingMovie = await MovieModel.findById(movieId).select("rating");

      if (!ratingMovie) throw createError.BadRequest(`Movie is not exist`);

      const rating = await RatingModel.findByIdAndUpdate(
        ratingMovie.rating,
        {
          $inc: { likes: 1 },
        },
        { new: true }
      ).exec();

      return { status: 200, data: rating };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
