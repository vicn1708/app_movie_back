import VideoModel from "../../schema/videos.schema";
import MovieModel from "../../schema/movies.schema";
import RatingModel from "../../schema/ratings.schema";
import CategoryModel from "../../schema/categories.schema";
import BannerModel from "../../schema/banners.schema";
import PosterModel from "../../schema/posters.schema";
import mongoose, { ObjectId } from "mongoose";
import { v2 } from "cloudinary";
import createError from "http-errors";
const cloudinary = v2.uploader;

export const movieService = {
  async create(dataMovie: any, filesMovie: any) {
    try {
      const { title, description, characters, categories, genres, casts } =
        JSON.parse(dataMovie);

      if (
        !title ||
        !description ||
        !characters ||
        !categories ||
        !genres ||
        !casts
      ) {
        if (
          typeof characters != typeof [] ||
          typeof categories != typeof [] ||
          typeof genres != typeof [] ||
          typeof casts != typeof []
        ) {
          throw createError.BadRequest("List data not an array");
        }
        throw createError.BadRequest("Data field is missing");
      }

      const trailerPublicId = filesMovie["trailer"][0].filename;
      const bannerPublicId = filesMovie["banner"][0].filename;
      const posterPublicId = filesMovie["poster"][0].filename;

      if (!trailerPublicId || !bannerPublicId || !posterPublicId) {
        throw createError.BadRequest("Data file is missing");
      }

      const trailerPath = filesMovie["trailer"][0].path;
      const bannerPath = filesMovie["banner"][0].path;
      const posterPath = filesMovie["poster"][0].path;

      const category: mongoose.Types.ObjectId[] = [];

      await categories.forEach(async (name: string) => {
        return await CategoryModel.findOne({
          name: name,
        }).then((data) => category.push(data._id));
      });

      const rating = await RatingModel.create({});

      const video = await VideoModel.create({
        trailer: trailerPath,
        trailer_public_id: trailerPublicId,
        // root,
        // backup,
      });

      const movie = await MovieModel.create({
        categories: category,
        rating: rating._id,
        video: video._id,
        title,
        casts,
        characters,
        genres,
        description,
      }).then((data) => data.toObject());

      const poster = await PosterModel.create({
        movie: movie._id,
        public_id: posterPublicId,
        uri: posterPath,
      }).then((data) => data.toObject());

      const banner = await BannerModel.create({
        movie: movie._id,
        public_id: bannerPublicId,
        uri: bannerPath,
      }).then((data) => data.toObject());

      const result = {
        movie,
        poster,
        banner,
      };

      return { status: 200, data: result };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async findAll() {
    try {
      const banners = await BannerModel.find().select("movie uri");

      const posters = await PosterModel.find().select("movie uri");

      const movies = await MovieModel.find()
        .populate("categories", "name")
        .populate("rating")
        .populate("video", "trailer")
        .then((data) => {
          return data.map((movie) => {
            const banner = banners.filter((banner) => banner.movie == movie.id);
            const poster = posters.filter((poster) => poster.movie == movie.id);

            return {
              ...movie.toObject(),
              banner: banner,
              poster: poster,
            };
          });
        });

      return { status: 200, data: movies };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async findOne(id: string) {
    try {
      const movieId: ObjectId = Object(id);

      const movie = await MovieModel.findOne({ _id: movieId })
        .populate("categories", "name")
        .populate("rating", "likes views prize")
        .populate("video", "trailer");

      const banner = await BannerModel.findOne({ movie: movie._id })
        .select("movie uri")
        .then((item) => item.toObject());

      const poster = await PosterModel.findOne({ movie: movie._id })
        .select("movie uri")
        .then((item) => item.toObject());

      const result = {
        ...movie.toObject(),
        banner,
        poster,
      };

      return { status: 200, data: result };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async deleteOne(id: string) {
    try {
      const movieId: ObjectId = Object(id);

      const movie = await MovieModel.findOne({ _id: movieId }).select(
        "rating video"
      );

      await VideoModel.findById(movie.video).then(async (data) => {
        return await cloudinary.destroy(
          data.trailer_public_id,
          { resource_type: "video" },
          (err, result) => {
            if (err) {
              throw createError.BadRequest("Error destroy video");
            }
          }
        );
      });

      await BannerModel.findOne({ movie: movieId }).then(async (data) => {
        return await cloudinary.destroy(data.public_id, (err, result) => {
          if (err) {
            throw createError.BadRequest("Error destroy banner");
          }
        });
      });

      await PosterModel.findOne({ movie: movieId }).then(async (data) => {
        return await cloudinary.destroy(data.public_id, (err, result) => {
          if (err) {
            throw createError.BadRequest("Error destroy poster");
          }
        });
      });

      await RatingModel.findByIdAndDelete(movie.rating).catch((err) => {
        throw createError.BadRequest("Rating cannot be deleted");
      });

      await MovieModel.findByIdAndDelete(movieId).catch((err) => {
        throw createError.BadRequest("Movie cannot be deleted");
      });

      await BannerModel.deleteOne({ movie: movieId }).catch((err) => {
        throw createError.BadRequest("Banner cannot be deleted");
      });

      await PosterModel.deleteOne({ movie: movieId }).catch((err) => {
        throw createError.BadRequest("Poster cannot be deleted");
      });

      await VideoModel.findByIdAndDelete(movie.video).catch((err) => {
        throw createError.BadRequest("Video cannot be deleted");
      });

      return { status: 200, data: "Delete data successfully" };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async getAllMovieByCategory() {
    try {
      const banners = await BannerModel.find().select("movie uri");

      const posters = await PosterModel.find().select("movie uri");

      const categories = await CategoryModel.find().sort({ index: "asc" });

      const result = categories.map(async (category) => {
        const movies = await MovieModel.find({ categories: category._id })
          .select("-categories")
          .populate("rating")
          .populate("video", "trailer")
          .then((data) => {
            return data.map((movie) => {
              const banner = banners.filter(
                (banner) => banner.movie == movie.id
              );
              const poster = posters.filter(
                (poster) => poster.movie == movie.id
              );

              return {
                ...movie.toObject(),
                banner: banner,
                poster: poster,
              };
            });
          });

        return {
          category: category.name,
          movies,
        };
      });

      const resultPending = await Promise.all(result)
        .then((results) => results)
        .catch((error) => {
          throw new Error(error);
        });

      return { status: 200, data: resultPending };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
