import { categoriesController } from "../controllers/categories.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.get("/", categoriesController.findAll);

  return router;
};
