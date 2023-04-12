import UserModel from "../../schema/users.schema";
import MovieModel from "../../schema/movies.schema";
import { TypeUser } from "../../constants/enum";
import RoleModel from "../../schema/roles.schema";

export class StatisticalService {
  async simpleStatistical() {
    try {
      const countMovie = await MovieModel.count().exec();

      const roleUser = await RoleModel.findOne({ name: TypeUser.ADMIN });

      const countUser = await UserModel.find({ role: { $ne: roleUser._id } })
        .count()
        .exec();

      const data = {
        movies: countMovie,
        users: countUser,
      };

      return { status: 200, data };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
