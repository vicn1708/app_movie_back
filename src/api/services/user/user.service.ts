import { Model } from "mongoose";
import UserModel, { IUser } from "../../schema/users.schema";
import createError from "http-errors";

export class UserService {
  async getAllUserAccount() {
    try {
      // const users = await UserModel.find({ account: id })
      //   .select("-refresh_token")
      //   .populate("role", "name -_id");

      const users = await UserModel.find();

      if (!users) throw createError.BadRequest();

      return { status: 200, data: users };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
