import express from "express";
import authRoute from "./auth.route";
import movieRoute from "./movie.route";
import categoriesRoute from "./categories.route";

const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  movieRoute(router);
  categoriesRoute(router);
  return router;
};
