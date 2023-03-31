import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";
import UserModel from "./users.schema";
import MovieModel from "./movies.schema";

export interface IFavorite extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  movies: Array<mongoose.Types.ObjectId>;
}

const FavoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: UserModel },

  movies: { type: Array<mongoose.Types.ObjectId>, ref: MovieModel },

  ...dateSchema,
});

const FavoriteModel = mongoose.model<IFavorite>("favorites", FavoriteSchema);

export default FavoriteModel;
