import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";

const RatingSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },

  views: { type: Number, default: 0 },

  prize: { type: Number, default: 0 },

  ...dateSchema,
});

export const RatingModel = mongoose.model("ratings", RatingSchema);
