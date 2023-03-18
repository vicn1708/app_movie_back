import mongoose from "mongoose";
import { MovieModel } from "./movies.schema";
import { dateSchema } from "./date-root.schema";

const CategorySchema = new mongoose.Schema({
  name: String,

  ...dateSchema,
});

export const CategoryModel = mongoose.model("categories", CategorySchema);
