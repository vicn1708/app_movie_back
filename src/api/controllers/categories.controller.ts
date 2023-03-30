import { NextFunction, Request, Response } from "express";
import { categoriesService } from "../services/categories/categories.service";

export const categoriesController = {
  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const categories = await categoriesService.findAll();

    if (!categories.data) next(categories);

    return res.status(categories.status).send(categories.data);
  },
};
