import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/categories/categories.service";
import { Status } from "../constants/enum";
import { ICategory } from "../schema/categories.schema";
import { CreateCategory } from "../services/categories/types/create-category.type";

class CategoriesController {
  private readonly categoriesService: CategoriesService;

  constructor(categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const categories = await this.categoriesService.findAll();

    if (!categories.data) return next(categories);

    return res.status(categories.status).json(categories.data);
  }

  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const categoryId: string = req.params.id;

    const categories = await this.categoriesService.findOne(categoryId);

    if (!categories.data) return next(categories);

    return res.status(categories.status).json(categories.data);
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const data: CreateCategory = req.body;
    if (!data.status) data.status = Status.ACTIVE;

    const categories = await this.categoriesService.create(data);

    if (!categories.data) return next(categories);

    return res.status(categories.status).json(categories.data);
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const categoryId: string = req.params.id;

    const categories = await this.categoriesService.delete(categoryId);

    if (!categories.data) return next(categories);

    return res.status(categories.status).json(categories.data);
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const categoryId: string = req.params.id;
    const dataCategory: CreateCategory = req.body;

    const categories = await this.categoriesService.update(
      categoryId,
      dataCategory
    );

    if (!categories.data) return next(categories);

    return res.status(categories.status).json(categories.data);
  }
}

export const categoriesController = new CategoriesController(
  new CategoriesService()
);
