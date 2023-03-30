import UserModel from "../../schema/users.schema";
import createError from "http-errors";

export const userService = {
  async getAllUserAccount(id: string) {
    try {
      const users = await UserModel.find({ account: id })
        .select("-refresh_token")
        .populate("role", "name -_id");

      if (!users) throw createError.BadRequest();

      return { status: 200, data: users };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
