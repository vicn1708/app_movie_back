import { Express } from "express";
import authRoute from "./auth.route";
import movieRoute from "./movie.route";
import categoriesRoute from "./categories.route";
import userRoute from "./user.route";
import favoriteRoute from "./favorite.route";
import ratingRoute from "./rating.route";
import statisticalRoute from "./statistical.route";

export default (app: Express) => {
  app.use("/auth", authRoute());

  // app.use("/users", userRoute());

  app.use("/movies", movieRoute());

  app.use("/categories", categoriesRoute());

  app.use("/favorite", favoriteRoute());

  app.use("/rating", ratingRoute());

  app.use("/statistical", statisticalRoute());
};

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Quản lý API xác thực bảo mật
 *   - name: Movies
 *     description: Quản lý API phim
 *   - name: Categories
 *     description: Quản lý API danh mục
 *   - name: Favorite
 *     description: Quản lý API phim ưu thích
 *   - name: Rating
 *     description: Quản lý API xếp hạng phim
 *   - name: Statistical
 *     description: Quản lý API thống kê phim
 */
