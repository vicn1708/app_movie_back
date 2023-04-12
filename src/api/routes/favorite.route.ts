import { favoriteController } from "../controllers/favorite.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.get(
    "/:id",
    favoriteController.findFavoriteByUser.bind(favoriteController)
  );

  router.get(
    "/:userId/:movieId",
    favoriteController.addMovieToFavorite.bind(favoriteController)
  );

  router.delete(
    "/:userId/:movieId",
    favoriteController.removeMovieFromFavorite.bind(favoriteController)
  );

  return router;
};

/**
 * @swagger
 * /favorite/{id}:
 *  get:
 *    summary: show phim yêu thích theo user id
 *    tags: [Favorite]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: "Id của người dùng chính"
 *
 * /favorite/{userId}/{movieId}:
 *  get:
 *    summary: Thêm phim vào danh sách yêu thích của user
 *    tags: [Favorite]
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: "Id của người dùng chính"
 *      - in: path
 *        name: movieId
 *        type: string
 *        required: true
 *        description: "Id của phim"
 */

/**
 * @swagger
 * /favorite/{userId}/{movieId}:
 *  delete:
 *    summary: Xóa phim khỏi danh sách yêu thích của user
 *    tags: [Favorite]
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: "Id của người dùng chính"
 *      - in: path
 *        name: movieId
 *        type: string
 *        required: true
 *        description: "Id của phim"
 */
