import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";

export interface IRating extends mongoose.Document {
  likes: number;
  views: number;
  prize: number;
}

const RatingSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },

  views: { type: Number, default: 0 },

  prize: { type: Number, default: 0 },

  ...dateSchema,
});

const RatingModel = mongoose.model<IRating>("ratings", RatingSchema);

export default RatingModel;
