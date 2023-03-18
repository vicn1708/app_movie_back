import {
  validateRequestCreateMovie,
  validatorDto,
} from "../middleware/validator";
import uploadCloud from "../../configs/cloudinary";
import { movieController } from "../controllers/movie.controller";
import express from "express";

export default (router: express.Router) => {
  router.post(
    "/admin/movie/create",
    uploadCloud.fields([
      {
        name: "banner",
        maxCount: 1,
      },
      {
        name: "poster",
        maxCount: 1,
      },
      // {
      //   name: "trailer",
      //   maxCount: 1,
      // },
    ]),
    validateRequestCreateMovie(validatorDto.createMovieDto),
    movieController.create
  );

  router.delete("/admin/movie/delete/:id", movieController.deleteOne);
  router.get("/movies", movieController.findAll);
  router.get("/movie/:id", movieController.findOne);
};
