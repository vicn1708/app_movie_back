import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type CreateMovieValidator = {
  data: {};
  poster: File;
  banner: File;
};

export const validateRequest = (payload: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = payload.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    return next();
  };
};

export const validateRequestCreateMovie = (payload: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data: CreateMovieValidator = {
      data: JSON.parse(req.body.data),
      poster: req.files["poster"][0],
      banner: req.files["banner"][0],
    };

    const { error } = payload.validate(data);

    if (error) {
      return res
        .status(400)
        .send({ error: error.details[0].message, msg: "ko đúng định dạng" });
    }

    return next();
  };
};

export const validatorDto = {
  createUserDto: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),

  loginUserDto: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  createMovieDto: Joi.object({
    data: Joi.object().required(),
    poster: Joi.object().required(),
    banner: Joi.object().required(),
  }),
};
