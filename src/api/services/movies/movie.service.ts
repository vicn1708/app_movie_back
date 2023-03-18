import { Request, Response } from "express";
import { VideoModel } from "../../schema/videos.schema";
import { MovieModel } from "../../schema/movies.schema";
import { RatingModel } from "../../schema/ratings.schema";
import { CategoryModel } from "../../schema/categories.schema";
import { BannerModel } from "../../schema/banners.schema";
import { PosterModel } from "../../schema/posters.schema";
import mongoose, { ObjectId } from "mongoose";
import { v2 } from "cloudinary";
const cloudinary = v2.uploader;

export const movieService = {
  async create(req: Request, res: Response) {
    const {
      title,
      description,
      trailer,
      characters,
      categories,
      genres,
      casts,
    } = JSON.parse(req.body.data);

    if (
      !title ||
      !description ||
      !trailer ||
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
        return res.status(400).send("List data not an array");
      }
      return res.status(400).send("data field is missing");
    }

    // const trailerPath = req.files["trailer"][0].path;
    const bannerPublicId = req.files["banner"][0].filename;
    const posterPublicId = req.files["poster"][0].filename;

    const bannerPath = req.files["banner"][0].path;
    const posterPath = req.files["poster"][0].path;

    if (!bannerPath || !posterPath) {
      return res.status(400).send("data file is missing");
    }

    const category: mongoose.Types.ObjectId[] = [];

    await categories.forEach(async (name: string) => {
      return await CategoryModel.findOne({
        name: name,
      }).then((data) => category.push(data._id));
    });

    console.log(category);

    const rating = await RatingModel.create({});

    const video = await VideoModel.create({
      trailer,
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
      publicId: posterPublicId,
      uri: posterPath,
    }).then((data) => data.toObject());

    const banner = await BannerModel.create({
      movie: movie._id,
      publicId: bannerPublicId,
      uri: bannerPath,
    }).then((data) => data.toObject());

    const result = {
      movie,
      poster,
      banner,
    };

    return res.status(200).send(result);
  },

  async findAll(req: Request, res: Response) {
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

    return res.status(200).send(movies);
  },

  async findOne(req: Request, res: Response) {
    const movieId: ObjectId = Object(req.params.id.toString());

    const movie = await MovieModel.findOne({ _id: movieId })
      .populate("categories", "name")
      .populate("rating")
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

    res.status(200).send(result);
  },

  async deleteOne(req: Request, res: Response) {
    const movieId: ObjectId = Object(req.params.id.toString());

    const movie = await MovieModel.findOne({ _id: movieId }).select(
      "rating video"
    );

    await BannerModel.findOne({ movie: movieId }).then((data) => {
      cloudinary.destroy(data.publicId, (err, result) => {
        if (err) {
          console.log("Error:", err);
          return res.status(400).send({ Error: err });
        }
      });
    });

    await PosterModel.findOne({ movie: movieId }).then((data) => {
      cloudinary.destroy(data.publicId, (err, result) => {
        if (err) {
          return res.status(400).send({ Error: err });
        }
      });
    });

    await RatingModel.findByIdAndDelete(movie.rating).catch((err) => {
      return res.status(400).send(`Rating cannot be deleted: ${err}`);
    });

    await VideoModel.findByIdAndDelete(movie.rating).catch((err) => {
      return res.status(400).send(`Video cannot be deleted: ${err}`);
    });

    await BannerModel.deleteOne({ movie: movieId }).catch((err) => {
      return res.status(400).send(`Banner cannot be deleted: ${err}`);
    });

    await PosterModel.deleteOne({ movie: movieId }).catch((err) => {
      return res.status(400).send(`Poster cannot be deleted: ${err}`);
    });

    await MovieModel.findByIdAndDelete(movieId).catch((err) => {
      return res.status(400).send(`Movie cannot be deleted: ${err}`);
    });

    return res.status(200).send("Delete data successfully");
  },
};
