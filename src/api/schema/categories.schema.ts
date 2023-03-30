import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";
import { Status } from "../constants/enum";

export interface ICategory extends mongoose.Document {
  name: string;
  status: string;
}

const CategorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },

  status: { type: String, default: Status.ACTIVE },

  ...dateSchema,
});

const CategoryModel = mongoose.model<ICategory>("categories", CategorySchema);

export default CategoryModel;
