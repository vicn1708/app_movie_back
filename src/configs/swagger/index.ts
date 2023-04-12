import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
// import * as swaggerDocument from "./swagger.json";
// const swaggerDocument = require("./swagger.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation Movie App",
      version: "1.0.0",
      description: "Đây là 1 tài liệu API cho Movie App.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./**/*.ts"], // đường dẫn tới các files chứa source code api
};

const specs = swaggerJsdoc(options);

export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
