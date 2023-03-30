import PosterModel from "../../schema/posters.schema";
import FavoriteModel from "../../schema/favorites.schema";
import createError from "http-errors";
import { Types } from "mongoose";
import BannerModel from "../../schema/banners.schema";

export const favoriteService = {
  async addMovieToFavorite(userId: string, movieId: string) {
    try {
      const isFavorite = await FavoriteModel.findOne({ user: userId }).then(
        (data) => data.toObject()
      );

      if (!isFavorite) {
        const favorite = await FavoriteModel.create({
          user: new Types.ObjectId(userId),
          movies: new Types.ObjectId(movieId),
        });

        return { status: 200, data: favorite };
      }

      await FavoriteModel.updateOne(
        { _id: isFavorite._id },
        { $push: { movies: new Types.ObjectId(movieId) } }
      );

      const favorite = await this.findAllByUser(userId);

      return { status: 200, data: favorite };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async findAllByUser(id: string) {
    try {
      const banners = await BannerModel.find().select("movie uri");

      const posters = await PosterModel.find().select("movie uri");

      const favorite = await FavoriteModel.findOne({
        user: new Types.ObjectId(id),
      })
        .populate("movies")
        .then((data: any) => {
          return data.movies.map((movie: any) => {
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
};
