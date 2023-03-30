import Joi from "joi";

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
    trailer: Joi.object().required(),
    poster: Joi.object().required(),
    banner: Joi.object().required(),
  }),
};
