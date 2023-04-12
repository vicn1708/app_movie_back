import { UserService } from "../services/user/user.service";
import { NextFunction, Request, Response } from "express";

class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUserAccount(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    // const accountId = req.user.data.account;
    const users = await this.userService.getAllUserAccount();

    if (!users.data) return next();

    return res.status(users.status).json(users.data);
  }
}

const userService = new UserService();
export const userController = new UserController(userService);
