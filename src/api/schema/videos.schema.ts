import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";

export interface IVideo extends mongoose.Document {
  trailer: string;
  trailer_public_id: string;
}

const VideoSchema = new mongoose.Schema({
  trailer: String,

  trailer_public_id: String,

  // root: String,

  // backup: String,

  ...dateSchema,
});

const VideoModel = mongoose.model<IVideo>("videos", VideoSchema);

export default VideoModel;
