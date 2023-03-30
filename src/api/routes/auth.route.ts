import { authController } from "../controllers/auth.controller";
import express from "express";
import passport from "passport";
import { Role } from "../middleware/roles";
import { validateRequest } from "../middleware/validator";
import { validatorDto } from "../middleware/validator/validator.dto";

const router = express.Router();

export default (): express.Router => {
  router.post(
    "/register",
    validateRequest(validatorDto.createUserDto),
    authController.register
  );

  router.post(
    "/login",
    validateRequest(validatorDto.loginUserDto),
    authController.login
  );

  router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    authController.profile
  );

  router.post("/refresh-token", authController.refreshToken);

  // router.get(
  //   "/auth/findAll",
  //   passport.authenticate("jwt", { session: false }),
  //   Role.checkAdminRole,
  //   authController.findUsers
  // );

  return router;
};
