import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";

const VideoSchema = new mongoose.Schema({
  trailer: String,

  // root: String,

  // backup: String,

  ...dateSchema,
});

export const VideoModel = mongoose.model("videos", VideoSchema);
