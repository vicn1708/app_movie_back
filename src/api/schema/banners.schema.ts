import mongoose from "mongoose";
import MovieModel from "./movies.schema";
import { dateSchema } from "./date-root.schema";

export interface IBanner extends mongoose.Document {
  movie: mongoose.Types.ObjectId;
  public_id: string;
  uri: string;
}

const BannerSchema = new mongoose.Schema({
  movie: { type: mongoose.Types.ObjectId, ref: MovieModel },

  public_id: String,

  uri: String,

  ...dateSchema,
});

const BannerModel = mongoose.model<IBanner>("banners", BannerSchema);

export default BannerModel;
