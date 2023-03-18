import { categoriesService } from "../services/categories/categories.service";

export const categoriesController = {
  findAll: categoriesService.findAll,
};
