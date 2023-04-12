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
    authController.register.bind(authController)
  );

  router.post(
    "/login",
    validateRequest(validatorDto.loginUserDto),
    authController.login.bind(authController)
  );

  router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    authController.profile.bind(authController)
  );

  router.post(
    "/refresh-token",
    authController.refreshToken.bind(authController)
  );

  router.get(
    "/all-users-account",
    passport.authenticate("jwt", { session: false }),
    authController.getAllUserByAccount.bind(authController)
  );

  router.get(
    "/main-users-account/:userId",
    passport.authenticate("jwt", { session: false }),
    authController.getMainUserAccount.bind(authController)
  );

  // router.get(
  //   "/auth/findAll",
  //   passport.authenticate("jwt", { session: false }),
  //   Role.checkAdminRole,
  //   authController.findUsers
  // );

  return router;
};

/**
 * @swagger
 * components:
 *    schemas:
 *      CreateAccount:
 *        type: object
 *        required:
 *          - email
 *          - username
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *          username:
 *            type: string
 *          password:
 *            type: string
 *            format: password
 *      Login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *            format: password
 *
 * /auth/register:
 *  post:
 *    summary: Đăng ký
 *    tags: [Auth]
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateAccount'
 *
 * /auth/login:
 *  post:
 *    summary: Đăng nhập
 *    tags: [Auth]
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *
 * /auth/profile:
 *  get:
 *    summary: lấy thông tin tài khoản qua xác thực người dùng
 *    tags: [Auth]
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        default: Bearer {jwt}
 *        description: "Bearer token for authorization"
 *    security:
 *      - bearerAuth: []
 *
 * /auth/refresh-token:
 *  post:
 *    summary: Đăng ký token mới
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refresh_token:
 *                type: string
 *    security:
 *      - bearerAuth: []
 *
 * /auth/all-users-account:
 *  get:
 *    summary: Lấy tất của user của 1 tài khoản
 *    tags: [Auth]
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        default: Bearer {jwt}
 *        description: "Bearer token for authorization"
 *    security:
 *      - bearerAuth: []
 *
 * /main-users-account/{userId}:
 *  get:
 *    summary: Trả lại 1 người dùng chính và những người dùng con
 *    tags: [Auth]
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        default: Bearer {jwt}
 *        description: "Bearer token for authorization"
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: "Id của người dùng chính"
 *    security:
 *     - bearerAuth: []
 */
