import { validateRequestCreateMovie } from "../middleware/validator";
import uploadCloud from "../../configs/cloudinary";
import { movieController } from "../controllers/movie.controller";
import express from "express";
import { validatorDto } from "../middleware/validator/validator.dto";

const router = express.Router();

export default (): express.Router => {
  router.get("/", movieController.findAll.bind(movieController));

  router.get(
    "/limit/:limit",
    movieController.findAllLimit.bind(movieController)
  );

  router.post(
    "/",
    uploadCloud.fields([
      {
        name: "banner",
        maxCount: 1,
      },
      {
        name: "poster",
        maxCount: 1,
      },
      {
        name: "trailer",
        maxCount: 1,
      },
    ]),
    validateRequestCreateMovie(validatorDto.createMovieDto),
    movieController.create.bind(movieController)
  );

  router.put(
    "/:movieId",
    uploadCloud.fields([
      {
        name: "banner",
        maxCount: 1,
      },
      {
        name: "poster",
        maxCount: 1,
      },
      {
        name: "trailer",
        maxCount: 1,
      },
    ]),
    movieController.updateOne.bind(movieController)
  );

  router.delete("/:movieId", movieController.deleteOne.bind(movieController));

  router.get("/detail/:movieId", movieController.findOne.bind(movieController));

  router.get(
    "/movies-by-category",
    movieController.getAllMovieByCategory.bind(movieController)
  );

  router.get(
    "/movies-top-views/:limit",
    movieController.getMoviesTopViews.bind(movieController)
  );

  router.get(
    "/movies-top-likes/:limit",
    movieController.getMoviesTopLikes.bind(movieController)
  );

  return router;
};

/**
 * @swagger
 * components:
 *    schemas:
 *      CreateMovie:
 *        type: object
 *        required:
 *          - data
 *          - trailer
 *          - banner
 *          - poster
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              characters:
 *                type: string
 *                description: Đây là 1 mảng chứa item có type là string
 *              categories:
 *                type: string
 *                description: Đây là 1 mảng chứa item có type là string
 *              genres:
 *                type: string
 *                description: Đây là 1 mảng chứa item có type là string
 *              casts:
 *                type: string
 *                description: Đây là 1 mảng chứa item có type là string
 *          trailer:
 *            type: string
 *            description: File containing the movie's trailer in MP4 format.
 *          banner:
 *            type: string
 *            description: File containing the movie's banner image in JPEG or PNG format.
 *          poster:
 *            type: string
 *            description: File containing the movie's poster image in JPEG or PNG format.
 *
 * /movies:
 *  get:
 *    summary: Lấy tất cả phim
 *    tags: [Movies]
 *
 *  post:
 *    summary: Tạo phim mới
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateMovie'
 *
 * /movies/{limit}:
 *  get:
 *    summary: giới hạn phim cần lấy
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: limit
 *        type: string
 *        required: true
 *        description: số lượng giới hạn
 *
 * /movies/{movieId}:
 *  put:
 *    summary: Tạo phim mới
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateMovie'
 *
 * /movies/{id}:
 *  delete:
 *    summary: Tạo phim mới
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: "Id của phim"
 *
 * /movies/movies-by-category:
 *  get:
 *    summary: Lấy tất cả phim theo từng danh mục
 *    tags: [Movies]
 *
 * /movies/detail/{id}:
 *  get:
 *    summary: Chi tiết phim
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: "Id của phim"
 *
 * /movies/movies-top-views/{limit}:
 *  get:
 *    summary: Top phim có views cao nhất
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: limit
 *        type: string
 *        required: true
 *        description: "số phim giới hạn"
 *
 * /movies/movies-top-likes/{limit}:
 *  get:
 *    summary: Top phim có likes cao nhất
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: limit
 *        type: string
 *        required: true
 *        description: "số phim giới hạn"
 */
