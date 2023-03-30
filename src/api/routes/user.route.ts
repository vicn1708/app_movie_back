import passport from "passport";
import { userController } from "../controllers/user.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.get(
    "/all-user-account",
    passport.authenticate("jwt", { session: false }),
    userController.getAllUserAccount
  );
  return router;
};
