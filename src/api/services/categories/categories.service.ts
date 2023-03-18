import { CategoryModel } from "../../schema/categories.schema";
import express from "express";
export const categoriesService = {
  async findAll(req: express.Request, res: express.Response) {
    const categories = await CategoryModel.find().select("name");
    res.status(200).send(categories);
  },
};
