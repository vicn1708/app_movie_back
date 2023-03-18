import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";
import { UserModel } from "./users.schema";
import { MovieModel } from "./movies.schema";

const FavoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: UserModel },

  movie: { type: mongoose.Types.ObjectId, ref: MovieModel },

  ...dateSchema,
});

export const FavoriteModel = mongoose.model("favorites", FavoriteSchema);
