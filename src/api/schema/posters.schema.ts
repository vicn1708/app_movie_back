import mongoose from "mongoose";
import MovieModel from "./movies.schema";
import { dateSchema } from "./date-root.schema";

export interface IPoster extends mongoose.Document {
  movie: mongoose.Types.ObjectId;
  public_id: string;
  uri: string;
}

const PosterSchema = new mongoose.Schema({
  movie: { type: mongoose.Types.ObjectId, ref: MovieModel },

  public_id: String,

  uri: String,

  ...dateSchema,
});

const PosterModel = mongoose.model<IPoster>("posters", PosterSchema);

export default PosterModel;


