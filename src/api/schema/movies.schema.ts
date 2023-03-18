import mongoose, { Types } from "mongoose";
import { dateSchema } from "./date-root.schema";
import { CategoryModel } from "./categories.schema";
import { RatingModel } from "./ratings.schema";
import { VideoModel } from "./videos.schema";

const MovieSchema = new mongoose.Schema({
  categories: { type: Array<Types.ObjectId>, ref: CategoryModel },

  rating: { type: Types.ObjectId, ref: RatingModel },

  video: { type: Types.ObjectId, ref: VideoModel },

  title: String,

  casts: Array,

  characters: Array,

  genres: Array,

  description: String,

  ...dateSchema,
});

export const MovieModel = mongoose.model("movies", MovieSchema);
