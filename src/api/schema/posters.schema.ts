import mongoose from "mongoose";
import { MovieModel } from "./movies.schema";
import { dateSchema } from "./date-root.schema";

const PosterSchema = new mongoose.Schema({
  movie: { type: mongoose.Types.ObjectId, ref: MovieModel },

  publicId: String,

  uri: String,

  ...dateSchema,
});

export const PosterModel = mongoose.model("posters", PosterSchema);
