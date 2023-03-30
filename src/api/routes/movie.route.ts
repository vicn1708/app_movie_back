import { validateRequestCreateMovie } from "../middleware/validator";
import uploadCloud from "../../configs/cloudinary";
import { movieController } from "../controllers/movie.controller";
import express from "express";
import { validatorDto } from "../middleware/validator/validator.dto";

const router = express.Router();

export default (): express.Router => {
  router.get("/", movieController.findAll);

  router.post(
    "/create",
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
    movieController.create
  );

  router.delete("/delete/:id", movieController.deleteOne);

  router.get("/detail/:id", movieController.findOne);

  router.get("/movies-by-category", movieController.getAllMovieByCategory);

  return router;
};
