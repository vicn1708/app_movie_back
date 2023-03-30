import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth/auth.service";

export const authController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const signUp = await authService.register(req.body);

    if (!signUp.data) next(signUp);

    return res.status(signUp.status).send(signUp.data);
  },

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const signIn = await authService.login(req.body);

    if (!signIn.data) next(signIn);

    return res.status(signIn.status).send(signIn.data);
  },

  async profile(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    return res.status(200).send(user);
  },

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const refresh_token: string = req.body.refresh_token;

    const access_token = await authService.getNewAccessToken(refresh_token);

    if (!access_token.data) next(access_token);

    return res.status(access_token.status).send(access_token.data);
  },

  // findUsers: authService.findUsers,
};
