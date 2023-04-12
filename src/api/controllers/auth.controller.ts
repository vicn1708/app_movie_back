import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth/auth.service";

class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const signUp = await this.authService.register(req.body);

    if (!signUp.data) return next(signUp);

    return res.status(signUp.status).json(signUp.data);
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const signIn = await this.authService.login(req.body);

    if (!signIn.data) return next(signIn);

    return res.status(signIn.status).json(signIn.data);
  }

  async profile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const user = req.user;
    if (!user) return next(user);
    return res.status(200).json(user);
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const refresh_token: string = req.body.refresh_token;

    const access_token = await this.authService.getNewAccessToken(
      refresh_token
    );

    if (!access_token.data) return next(access_token);

    return res.status(access_token.status).json(access_token.data);
  }

  async getAllUserByAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const accountId = req.user;

    const users = await this.authService.getAllUserByAccount(accountId);

    if (!users.data) return next(users);

    return res.status(users.status).json(users.data);
  }

  async getMainUserAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const account = req.user;

    const userId = req.params.userId;

    const main = await this.authService.getMainUserAccount(account, userId);

    if (!main.data) return next(main);

    return res.status(main.status).json(main.data);
  }
}

export const authController = new AuthController(new AuthService());
