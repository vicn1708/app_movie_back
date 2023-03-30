import { userService } from "../services/user/user.service";
import { NextFunction, Request, Response } from "express";

export const userController = {
  async getAllUserAccount(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const accountId = req.user.data.account;
    const users = await userService.getAllUserAccount(accountId);

    if (!users.data) next();

    return res.status(users.status).send(users.data);
  },
};
