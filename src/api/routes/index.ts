import { Express } from "express";
import authRoute from "./auth.route";
import movieRoute from "./movie.route";
import categoriesRoute from "./categories.route";
import userRoute from "./user.route";
import favoriteRoute from "./favorite.route";

export default (app: Express) => {
  app.use("/auth", authRoute());

  app.use("/user", userRoute());

  app.use("/movies", movieRoute());

  app.use("/categories", categoriesRoute());

  app.use("/favorite", favoriteRoute());
};
