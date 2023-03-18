import { Status } from "../constants/enum";
import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";

const AccountSchema = new mongoose.Schema({
  email: String,

  password: { type: String },

  status: { type: String, default: Status.ACTIVE },

  ...dateSchema,
});

export const AccountModel = mongoose.model("accounts", AccountSchema);
