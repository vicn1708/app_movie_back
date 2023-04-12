import { categoriesController } from "../controllers/categories.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.get("/", categoriesController.findAll.bind(categoriesController));

  router.get("/:id", categoriesController.findOne.bind(categoriesController));

  router.post("/", categoriesController.create.bind(categoriesController));

  router.delete("/:id", categoriesController.delete.bind(categoriesController));

  router.put("/:id", categoriesController.update.bind(categoriesController));

  return router;
};

/**
 * @swagger
 * components:
 *    schemas:
 *      CreateCategory:
 *        type: object
 *        required:
 *          - name
 *          - status
 *        properties:
 *          name:
 *            type: string
 *          status:
 *            type: string
 *
 * /categories:
 *  post:
 *    summary: Tạo danh mục mới
 *    tags: [Categories]
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateCategory'
 *  get:
 *    summary: Lấy tất cả danh mục
 *    tags: [Categories]
 *
 * /categories/{id}:
 *  get:
 *    summary: chi tiết danh mục theo id
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: "Id của danh mục"
 *
 *  delete:
 *    summary: xóa danh mục theo id
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: "Id của danh mục"
 *
 *  put:
 *    summary: Cập nhật danh mục theo id
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: "id của danh mục"
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateCategory'
 */
