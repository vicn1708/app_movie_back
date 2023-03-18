import { Status } from "../constants/enum";
import mongoose, { Types } from "mongoose";
import { dateSchema } from "./date-root.schema";
import { RoleModel } from "./roles.schema";
import { AccountModel } from "./accounts.schema";

const UserSchema = new mongoose.Schema({
  account: { type: Types.ObjectId, ref: AccountModel },

  username: String,

  phone: String,

  avatar: String,

  role: { type: Types.ObjectId, ref: RoleModel },

  status: { type: String, default: Status.ACTIVE },

  refresh_token: { type: String, default: "" },

  ...dateSchema,
});

export const UserModel = mongoose.model("users", UserSchema);
