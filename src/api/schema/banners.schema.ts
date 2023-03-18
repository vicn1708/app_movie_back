import mongoose from "mongoose";
import { MovieModel } from "./movies.schema";
import { dateSchema } from "./date-root.schema";

const BannerSchema = new mongoose.Schema({
  movie: { type: mongoose.Types.ObjectId, ref: MovieModel },

  publicId: String,

  uri: String,

  ...dateSchema,
});

export const BannerModel = mongoose.model("banners", BannerSchema);
