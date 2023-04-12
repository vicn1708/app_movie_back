import CategoryModel, { ICategory } from "../../schema/categories.schema";
import createError from "http-errors";
import { CreateCategory } from "./types/create-category.type";

export class CategoriesService {
  async findAll() {
    try {
      const categories = await CategoryModel.find()
        .select("index name status")
        .sort({ index: "asc" });

      if (!categories) throw createError.BadRequest();

      return { status: 200, data: categories };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findOne(categoryId: string) {
    try {
      const categories = await CategoryModel.findById(categoryId).select(
        "index name status"
      );

      if (!categories) throw createError.BadRequest();

      return { status: 200, data: categories };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async create(dataCreateCategory: CreateCategory) {
    try {
      const { name, status } = dataCreateCategory;

      const category = await CategoryModel.create({
        name,
        status,
      });

      if (!category) throw createError.BadRequest("Category creation failed");

      return { status: 200, data: category };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async delete(categoryId: string) {
    try {
      const deleteCategory = await CategoryModel.findByIdAndDelete(categoryId);

      if (!deleteCategory)
        throw createError.BadRequest("Category deletion failed");

      return { status: 200, data: deleteCategory };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async update(categoryId: string, dataCategory: CreateCategory) {
    try {
      const { name, status } = dataCategory;

      if (!name) throw createError.BadRequest(`error name`);

      const category = await CategoryModel.findById(categoryId).exec();

      if (!category) throw createError.BadRequest("category not is exist");

      if (name && name != category.name) category.name = name;

      if (status && status != category.status) category.status = status;

      const updateCategory = await category.save();

      return { status: 200, data: updateCategory };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
