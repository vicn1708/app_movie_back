import { Status } from "../constants/enum";
import mongoose from "mongoose";
import { dateSchema } from "./date-root.schema";

export interface IAccount extends mongoose.Document {
  email: string;
  password: string;
  status: string;
}

const AccountSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },

  password: { type: String, required: true },

  status: { type: String, default: Status.ACTIVE },

  ...dateSchema,
});

const AccountModel = mongoose.model<IAccount>("accounts", AccountSchema);

export default AccountModel;
