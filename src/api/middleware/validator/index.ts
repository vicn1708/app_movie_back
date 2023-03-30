import { Request, Response, NextFunction } from "express";
import { CreateMovie } from "../../services/movies/types/create-movie.type";

export const validateRequest = (payload: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = payload.validate(req.body);

    if (error) {
      return res.status(401).json({ error: error.details[0].message });
    }

    return next();
  };
};

export const validateRequestCreateMovie = (payload: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data: CreateMovie = {
      data: JSON.parse(req.body.data),
      trailer: req.files["poster"][0],
      poster: req.files["poster"][0],
      banner: req.files["banner"][0],
    };

    const { error } = payload.validate(data);

    if (error) {
      return res
        .status(401)
        .send({ error: error.details[0].message, msg: "ko đúng định dạng" });
    }

    return next();
  };
};
