import { statisticalController } from "../controllers/statistical.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.get(
    "/simple-statistical",
    statisticalController.simpleStatistical.bind(statisticalController)
  );

  return router;
};

/**
 * @swagger
 * /statistical/simple-statistical:
 *  get:
 *      summary: Thống kê cơ bản
 *      tags: [Statistical]
 */
