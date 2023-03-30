import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";
import { TypeUser } from "../constants/enum";

export interface IRole extends mongoose.Document {
  name: TypeUser;
}

const RoleSchema = new mongoose.Schema({
  name: { type: String, default: TypeUser.USER },

  ...dateSchema,
});

const RoleModel = mongoose.model<IRole>("roles", RoleSchema);

export default RoleModel;
