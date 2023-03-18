import { authController } from "../controllers/auth.controller";
import express from "express";
import passport from "passport";
import { validateRequest, validatorDto } from "../middleware/validator";
import { Role } from "../middleware/roles";

export default (router: express.Router) => {
  router.post(
    "/auth/register",
    validateRequest(validatorDto.createUserDto),
    authController.register
  );

  router.post(
    "/auth/login",
    validateRequest(validatorDto.loginUserDto),
    authController.login
  );

  // router.get(
  //   "/auth/profile",
  //   passport.authenticate("jwt", { session: false }),
  //   authController.profile
  // );

  // router.get(
  //   "/auth/findAll",
  //   passport.authenticate("jwt", { session: false }),
  //   Role.checkAdminRole,
  //   authController.findUsers
  // );
};
