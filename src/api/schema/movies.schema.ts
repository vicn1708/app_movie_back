import mongoose, { Types } from "mongoose";
import { dateSchema } from "./date-root.schema";
import CategoryModel from "./categories.schema";
import RatingModel from "./ratings.schema";
import VideoModel from "./videos.schema";

export interface IMovie extends mongoose.Document {
  categories: Array<Types.ObjectId>;
  rating: Array<Types.ObjectId>;
  video: Array<Types.ObjectId>;
  title: string;
  casts: Array<string>;
  characters: Array<string>;
  genres: Array<string>;
  description: string;
}

const MovieSchema = new mongoose.Schema({
  categories: { type: Array<Types.ObjectId>, ref: CategoryModel },

  rating: { type: Types.ObjectId, ref: RatingModel },

  video: { type: Types.ObjectId, ref: VideoModel },

  title: { type: String, unique: true, required: true },

  casts: Array,

  characters: Array,

  genres: Array,

  description: String,

  ...dateSchema,
});

const MovieModel = mongoose.model<IMovie>("movies", MovieSchema);

export default MovieModel;
