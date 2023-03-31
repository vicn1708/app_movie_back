import PosterModel from "../../schema/posters.schema";
import FavoriteModel from "../../schema/favorites.schema";
import createError from "http-errors";
import mongoose, { Types } from "mongoose";
import BannerModel from "../../schema/banners.schema";

export const favoriteService = {
  async findAllByUser(id: string) {
    try {
      const banners = await BannerModel.find().select("movie uri");

      const posters = await PosterModel.find().select("movie uri");

      const favorite = await FavoriteModel.findOne({
        user: new Types.ObjectId(id),
      })
        .populate("movies")
        .then((data: any) => {
          const movies = data.movies.reverse();
          return movies.map((movie: any) => {
            const banner = banners.filter((banner) => banner.movie == movie.id);
            const poster = posters.filter((poster) => poster.movie == movie.id);

            return {
              ...movie.toObject(),
              banner: banner,
              poster: poster,
            };
          });
        });

      if (!favorite) throw createError.BadRequest(`Not found favorite`);

      return { status: 200, data: favorite };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async addMovieToFavorite(userId: string, movieId: string) {
    try {
      const isFavorite = await FavoriteModel.findOne({ user: userId });

      if (!isFavorite) {
        const favorite = await FavoriteModel.create({
          user: userId,
          movies: movieId,
        }).then((data) => data.toObject());

        return { status: 200, data: favorite };
      }

      const isMovie = isFavorite.movies.includes(
        new mongoose.Types.ObjectId(movieId)
      );

      if (isMovie) throw createError.BadRequest("Movie had exist");

      const favorite = await FavoriteModel.updateOne(
        { _id: isFavorite._id },
        { $push: { movies: movieId } },
        { new: true }
      );

      return { status: 200, data: favorite };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async removeMovieFromFavorite(userId: string, movieId: string) {
    console.log(userId);
    console.log(movieId);

    try {
      const favorite = await FavoriteModel.updateOne(
        { user: userId },
        { $pull: { movies: movieId } }
      );

      if (!favorite) throw createError.BadRequest();

      return { status: 200, data: favorite };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
