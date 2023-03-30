import { Router } from "express";
import swaggerUi from "swagger-ui-express";
// const swaggerDocument = require("./swagger.json");

var options = {
  explorer: true,
};

export default (router: Router) => {
  router.use("/api-docs", swaggerUi.serve);
  router.get("/api-docs", swaggerUi.setup([], options));
};
