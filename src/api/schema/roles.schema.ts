import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";
import { TypeUser } from "../constants/enum";

const RoleSchema = new mongoose.Schema({
  name: { type: String, default: TypeUser.USER },

  ...dateSchema,
});

export const RoleModel = mongoose.model("roles", RoleSchema);
