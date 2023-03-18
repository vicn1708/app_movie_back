import { categoriesController } from "../controllers/categories.controller";
import express from "express";
export default (router: express.Router) => {
  router.get("/categories", categoriesController.findAll);
};
