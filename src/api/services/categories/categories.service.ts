import CategoryModel from "../../schema/categories.schema";
import createError from "http-errors";

export const categoriesService = {
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
  },
};
