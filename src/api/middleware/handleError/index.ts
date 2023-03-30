import express, { Express } from "express";
import createError from "http-errors";

export const handleError = (app: Express) => {
  app.use((req, res, next) => {
    next(createError.NotFound("This route does not exist."));
  });

  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.json({
        status: err.status || 500,
        message: err.message,
      });
    }
  );
};
