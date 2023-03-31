import { Status } from "../constants/enum";
import mongoose, { Types } from "mongoose";
import { dateSchema } from "./date-root.schema";
import RoleModel from "./roles.schema";
import AccountModel from "./accounts.schema";

export interface IUser extends mongoose.Document {
  account: Types.ObjectId;
  username: string;
  phone: string;
  avatar: string;
  status: string;
}

const UserSchema = new mongoose.Schema({
  account: { type: Types.ObjectId, ref: AccountModel },

  username: String,

  phone: { type: String, unique: false, default: "" },

  avatar: { type: String, default: "" },

  role: { type: Types.ObjectId, ref: RoleModel },

  status: { type: String, default: Status.ACTIVE },

  ...dateSchema,
});

const UserModel = mongoose.model<IUser>("users", UserSchema);

export default UserModel;
