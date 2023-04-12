import passport from "passport";
import { userController } from "../controllers/user.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.get(
    "/all-users-account",
    // passport.authenticate("jwt", { session: false }),
    userController.getAllUserAccount.bind(userController)
  );
  return router;
};
