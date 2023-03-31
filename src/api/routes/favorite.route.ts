import { favoriteController } from "../controllers/favorite.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.get("/:id", favoriteController.findFavoriteByUser);

  router.get("/:userId/:movieId", favoriteController.addMovieToFavorite);

  router.delete(
    "/:userId/:movieId",
    favoriteController.removeMovieFromFavorite
  );

  return router;
};
