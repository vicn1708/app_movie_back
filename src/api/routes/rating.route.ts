import { ratingController } from "../controllers/rating.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.get(
    "/views/:movieId",
    ratingController.updateViews.bind(ratingController)
  );

  router.get(
    "/likes/:movieId",
    ratingController.updateLikes.bind(ratingController)
  );

  //   router.get(
  //     "/prize/:movieId",
  //     ratingController.prize.bind(ratingController)
  //   );

  return router;
};

/**
 * @swagger
 * /rating/views/{movieId}:
 *  get:
 *      summary: Cập nhật số lượt xem của phim
 *      tags: [Rating]
 *      parameters:
 *        - in: path
 *          name: movieId
 *          type: string
 *          required: true
 *          description: "Id của phim"
 *
 * /rating/likes/{movieId}:
 *  get:
 *      summary: Cập nhật số lượt like của phim
 *      tags: [Rating]
 *      parameters:
 *        - in: path
 *          name: movieId
 *          type: string
 *          required: true
 *          description: "Id của phim"
 *
//  * /rating/prize/{movieId}:
//  *  get:
//  *      summary: Cập nhật đánh giá của phim
//  *      tags: [Rating]
//  *      parameters:
//  *        - in: path
//  *          name: movieId
//  *          type: string
//  *          required: true
//  *          description: "Id của phim"
 */
